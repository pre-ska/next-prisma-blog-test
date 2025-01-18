import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const initialPosts: Prisma.PostCreateInput[] = [
  {
    title: "Creating Server Functions",
    content:
      "A Server Function can be defined by using the use server directive. You can place the directive at the top of an asynchronous function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file. We recommend using a separate file in most instances.",
    published: true,
    slug: "creating-server-functions",
    author: {
      connectOrCreate: {
        where: {
          email: "john@email.com",
        },
        create: {
          email: "john@email.com",
          name: "John Doe",
          hashedPassword: "jhs987fdsakfsadgfdsjhasa7",
        },
      },
    },
  },
];

async function main() {
  console.log("Start seeding ...");

  for (const p of initialPosts) {
    const post = await prisma.post.create({
      data: p,
    });
    console.log(`Created post with id: ${post.id}`);
  }
  console.log("Seed finished");

  //     // upsert kreira ili updejta record
  //   const alice = await prisma.user.upsert({
  //     where: { email: 'alice@prisma.io' },
  //     update: {},
  //     create: {
  //       email: 'alice@prisma.io',
  //       name: 'Alice',
  //       posts: {
  //         create: {
  //           title: 'Check out Prisma with Next.js',
  //           content: 'https://www.prisma.io/nextjs',
  //           published: true,
  //           slug: 'check-out-prisma-with-nextjs',
  //         },
  //       },
  //     },
  //   })

  //   const bob = await prisma.user.upsert({
  //     where: { email: 'bob@prisma.io' },
  //     update: {},
  //     create: {
  //       email: 'bob@prisma.io',
  //       name: 'Bob',
  //       posts: {
  //         create: [
  //           {
  //             title: 'Follow Prisma on Twitter',
  //             content: 'https://twitter.com/prisma',
  //             published: true,
  //             slug: 'follow-prisma-on-twitter',
  //           },
  //           {
  //             title: 'Follow Nexus on Twitter',
  //             content: 'https://twitter.com/nexusgql',
  //             published: true,
  //             slug: 'follow-nexus-on-twitter',
  //           },
  //         ],
  //       },
  //     },
  //   })
  //   console.log({ alice, bob })
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
