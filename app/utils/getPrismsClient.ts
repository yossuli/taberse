import { PrismaD1 } from "@prisma/adapter-d1";
import { PrismaClient } from "@prisma/client";

export const getPrismaClient = async (db: D1Database) => {
  const adapter = new PrismaD1(db);
  return new PrismaClient({ adapter });
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it("getPrismaClient test", async () => {
    const db = {} as D1Database; // Mock D1Database
    const client = await getPrismaClient(db);
    expect(client).toBeInstanceOf(PrismaClient);
  });
}