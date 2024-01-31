import prisma from "./db";

async function main() {
  const users = await prisma.users.findMany();
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const newUser = await prisma.users.create({
//   data: {
//     user_info: {
//       create: {
//         name: "xd",
//         surname: "xd",
//         phone: "xd",
//         address: "xd",
//       },
//     },
//     privilege: {
//       connect: {
//         privilege_id: 2,
//       },
//     },
//     email: "w pizde se wsadzcie ten progeram",
//     password: "s",
//     enabled: true,
//   },
// });
