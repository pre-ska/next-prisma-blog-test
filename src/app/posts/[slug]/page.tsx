import { prisma } from "@/lib/db";
import React from "react";

// const getCachedPost = cache((slug: string) => {
//   return prisma.post.findUnique({
//     where: {
//       slug,
//     },
//   });
// });

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  // asynchronous access of `params.slug`.
  const { slug } = await params;

  // const post = await getCachedPost(slug);

  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  return (
    <main className="flex flex-col gap-y-5 items-center text-center pt-24 ">
      <h1 className="text-2xl sm:text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  );
};

export default PostPage;
