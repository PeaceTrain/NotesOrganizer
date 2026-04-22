import bcrypt from "bcryptjs";
import { prisma } from "./index";

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@inkforge.local" },
    update: {},
    create: { email: "admin@inkforge.local", passwordHash, role: "ADMIN" }
  });

  const notebook = await prisma.notebook.create({
    data: { name: "Inbox", userId: admin.id }
  });

  await prisma.topic.create({
    data: { name: "General", notebookId: notebook.id, description: "Default topic" }
  });

  await prisma.list.create({ data: { name: "todo", description: "Default to-do list" } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
