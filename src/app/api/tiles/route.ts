import { prisma } from "@/lib/prisma-client";
import { uploadImageToGCP } from "@/lib/upload-image";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const dynamic = "force-static";

export async function GET() {
  const tiles = await prisma.tile.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      collectionId: true,
      outdoorIndoorId: true,
      createdAt: true,
      updatedAt: true,

      collection: {
        select: {
          id: true,
          name: true,
          // add any other collection fields you need
        },
      },
      sizes: {
        select: {
          size: true, // assuming `size` is a relation field
        },
      },
      surfaces: {
        select: {
          surface: true, // assuming `surface` is a relation field
        },
      },
      features: {
        select: {
          feature: true, // assuming `feature` is a relation field
        },
      },
      colors: {
        select: {
          color: true, // assuming `color` is a relation field
        },
      },
      outdoorIndoor: {
        select: {
          id: true,
          name: true,
          // any other fields
        },
      },
    },
  });

  return NextResponse.json(tiles);
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
      outdoorIndoor: true,
      collection: true,
    },
  });
  const englishName = formData.get("englishName") as string;
  const niderlandName = formData.get("niderlandName") as string;

  const localesDir = path.join(process.cwd(), "src/i18n/text");

  const updateTranslation = (locale: string, key: string, value: string) => {
    const filePath = path.join(localesDir, `${locale}.json`);
    const translations = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Ensure "names" object exists
    if (!translations.names) {
      translations.names = {};
    }

    // Add or update the key inside the "names" object
    translations.names[key] = value;

    // Write back pretty JSON with indentation
    fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
  };

  // Here `name` is the key you want to add/update inside the names object
  updateTranslation("en", name, englishName);
  updateTranslation("nl", name, niderlandName);

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
    await prisma.tileSurface.deleteMany({ where: { tileId } });

    // Delete tile itself safely using deleteMany

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
