import { prisma } from "@/lib/prisma-client";

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/_/g, "-") // replace underscores
    .replace(/\s+/g, "-") // replace spaces
    .replace(/&/g, "and") // optional: & → and
    .replace(/[^a-z0-9\-]/g, "") // remove other symbols
    .replace(/--+/g, "-"); // collapse multiple hyphens
}

async function normalizeTileNames() {
  const tiles = await prisma.tile.findMany();

  for (const tile of tiles) {
    const newName = slugify(tile.name);

    if (tile.name !== newName) {
      await prisma.tile.update({
        where: { id: tile.id },
        data: { name: newName },
      });

      console.log(`Updated: ${tile.name} → ${newName}`);
    }
  }

  console.log("All tiles normalized.");
}

normalizeTileNames()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
