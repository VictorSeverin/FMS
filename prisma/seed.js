import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function main() {
    await prisma.user.create({
        data: {
            email: 'test@test.com',
            firstName: 'John',
            lastName: 'Doe'
        }
    })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })