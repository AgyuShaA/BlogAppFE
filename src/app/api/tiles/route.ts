import { prisma } from "@/lib/prisma-client";
import { uploadImageToGCP } from "@/lib/upload-image";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  const posts = await prisma.tile.findMany({
    include: {
      collection: true, // assuming relation name is 'collections'
      sizes: {
        include: { size: true }, // assuming join table has 'feature' relation
      },
      surfaces: {
        include: { surface: true }, // assuming join table has 'feature' relation
      },
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
  console.log(formData);

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
      outdoorIndoorId: outdoorIndoor[0] || null,

      features: {
        create: features.map((featureId: number) => ({
          feature: { connect: { id: featureId } },
        })),
      },
      surfaces: {
        create: surfaces.map((id: number) => ({
          surface: { connect: { id: id } },
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
      surfaces: { include: { surface: true } },
    },
  });
  const englishName = formData.get("englishName") as string;
  const niderlandName = formData.get("niderlandName") as string;

  const localesDir = path.join(process.cwd(), "src/i18n/text");

  const updateTranslation = (locale: string, value: string) => {
    const filePath = path.join(localesDir, `${locale}.json`);
    const translations = JSON.parse(fs.readFileSync(filePath, "utf8"));
    translations[name] = value;
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
  };

  updateTranslation("en", englishName);
  updateTranslation("nl", niderlandName);

  return NextResponse.json(tile);
}
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") ? Number(searchParams.get("id")) : null;
  if (!id)
    return NextResponse.json({ error: "Missing tile id" }, { status: 400 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string;
    const collection = formData.get("collection")
      ? Number(formData.get("collection"))
      : null;
    const outdoorIndoor = formData.get("outdoorIndoor")
      ? Number(formData.get("outdoorIndoor"))
      : null;
    console.log(collection);

    const imageUploadPromise = file
      ? uploadImageToGCP(file)
      : Promise.resolve(null);

    const colorIds = formData.get("colors")
      ? JSON.parse(String(formData.get("colors")))
      : [];

    const surfaceIds = formData.get("surfaces")
      ? JSON.parse(String(formData.get("surfaces")))
      : [];

    const featureIds = formData.get("features")
      ? JSON.parse(String(formData.get("features")))
      : [];

    const sizeIds = formData.get("sizes")
      ? JSON.parse(String(formData.get("sizes")))
      : [];

    const updatedTile = await prisma.tile.update({
      where: { id: Number(id) },
      data: {
        name,
        collectionId: collection,
        outdoorIndoorId: outdoorIndoor,

        colors: {
          deleteMany: {},
          create: colorIds.map((id: number) => ({
            color: { connect: { id: id } },
          })),
        },
        surfaces: {
          deleteMany: {},
          create: surfaceIds.map((id: number) => ({
            surface: { connect: { id: id } },
          })),
        },
        features: {
          deleteMany: {},
          create: featureIds.map((id: number) => ({
            feature: { connect: { id: id } },
          })),
        },

        sizes: {
          deleteMany: {},
          create: sizeIds.map((id: number) => ({
            size: { connect: { id: id } },
          })),
        },
      },
      include: {
        colors: { include: { color: true } },
        surfaces: { include: { surface: true } },
        features: { include: { feature: true } },
        sizes: { include: { size: true } },
      },
    });
    console.log(updatedTile);
    const imageUrl = await imageUploadPromise;
    if (imageUrl) {
      await prisma.tile.update({
        where: { id: Number(id) },
        data: { imageUrl },
      });
    }
    console.log(formData);

    console.log(updatedTile);
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
    await prisma.tileSurface.deleteMany({ where: { tileId } });

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
