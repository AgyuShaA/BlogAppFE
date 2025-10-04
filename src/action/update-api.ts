// app/actions/deleteTile.ts
"use server";

import { prisma } from "@/lib/prisma-client";

export async function deleteTile(id: number) {
  await prisma.tile.delete({
    where: { id },
  });
}
