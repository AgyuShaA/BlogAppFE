import { prisma } from "@/lib/prisma-client";
import { uploadImageToGCP } from "@/lib/upload-image";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.tile.findMany({
    include: {
      collection: true, // assuming relation name is 'collections'
      sizes: {
        include: { size: true }, // assuming join table has 'feature' relation
      },
      surface: true,
      features: {
        include: { feature: true }, // assuming join table has 'feature' relation
      },
      colors: {
        include: { color: true }, // assuming join table has 'color' relation
      },
      outdoorIndoor: true,
    },
  });
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const name = formData.get("name") as string;

  const collections = JSON.parse(
    (formData.get("collections") as string) || "[]"
  );
  const sizes = JSON.parse((formData.get("sizes") as string) || "[]");
  const surfaces = JSON.parse((formData.get("surfaces") as string) || "[]");
  const features = JSON.parse((formData.get("features") as string) || "[]");
  const colors = JSON.parse((formData.get("colors") as string) || "[]");
  const outdoorIndoor = JSON.parse(
    (formData.get("outdoorIndoor") as string) || "[]"
  );

  if (!file || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const imageUrl = await uploadImageToGCP(file);

  // Create the tile
  const tile = await prisma.tile.create({
    data: {
      name,

      imageUrl,
      collectionId: collections[0] || null, // take first selected collection (or adapt)
      sizes: {
        create: sizes.map((sizeId: number) => ({
          size: { connect: { id: sizeId } },
        })),
      },
      surfaceId: surfaces[0] || null,
      outdoorIndoorId: outdoorIndoor[0] || null,
      // Many-to-many relations
      features: {
        create: features.map((featureId: number) => ({
          feature: { connect: { id: featureId } },
        })),
      },
      colors: {
        create: colors.map((colorId: number) => ({
          color: { connect: { id: colorId } },
        })),
      },
    },
    include: {
      features: { include: { feature: true } },
      colors: { include: { color: true } },
    },
  });

  return NextResponse.json(tile);
}

export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "Missing tile id" }, { status: 400 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const collection = formData.get("collection")
      ? Number(formData.get("collection"))
      : null;
    const surface = formData.get("surface")
      ? Number(formData.get("surface"))
      : null;
    const outdoorIndoor = formData.get("outdoorIndoor")
      ? Number(formData.get("outdoorIndoor"))
      : null;

    const imageUploadPromise = file
      ? uploadImageToGCP(file)
      : Promise.resolve(null);

    const updatedTile = await prisma.tile.update({
      where: { id: Number(id) },
      data: {
        name,
        collectionId: collection,
        surfaceId: surface,
        outdoorIndoorId: outdoorIndoor,
      },
    });

    const imageUrl = await imageUploadPromise;
    if (imageUrl) {
      await prisma.tile.update({
        where: { id: Number(id) },
        data: { imageUrl },
      });
    }

    return NextResponse.json(updatedTile);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update tile" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "Missing tile id" }, { status: 400 });

  const tileId = Number(id);

  try {
    // Delete related records first (many-to-many)
    await prisma.tileColor.deleteMany({ where: { tileId } });
    await prisma.tileFeature.deleteMany({ where: { tileId } });
    await prisma.tileSize.deleteMany({ where: { tileId } });

    // Delete tile itself safely using deleteMany
    console.log("Attempting to delete tile with ID:", tileId);
    const deleted = await prisma.tile.deleteMany({ where: { id: tileId } });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete tile:", error);
    return NextResponse.json(
      { error: "Failed to delete tile" },
      { status: 500 }
    );
  }
}
