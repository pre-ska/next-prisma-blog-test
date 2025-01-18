/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost } from "@/actions/actions";
import { prisma } from "@/lib/db";
import Link from "next/link";
import React from "react";

const Posts = async () => {
  // const post = await prisma.post.findMany( );
  const user = await prisma.user.findMany({
    where: {
      email: "john@email.com",
    },
    include: {
      posts: true,
    },
  });

  console.log("user", user);

  // const post = await prisma.post.findMany({
  //   where: {
  //     title: {
  //       contains: "Exploring", // primjer filtriranja...ima sve opcije, gta, lt, gte...
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     slug: true,
  //     content: true,
  //   },
  //   // take: 1, // pagination
  //   // skip: 1, // pagination
  // });

  // ovo je za dohvatit sve postove iz tablice neovisno o useru i filterima
  const postCount = await prisma.post.count();

  return (
    <main className="flex flex-col gap-y-7 items-center text-center pt-24 ">
      <h1 className="text-2xl sm:text-3xl font-semibold">{`Posts ${
        postCount || 0
      }`}</h1>
      <ul className="border-t border-b border-black/10 leading-8 py-5">
        {(user[0].posts || []).map((post: any) => (
          <li key={post.id} className="flex items-center justify-between px-5">
            <Link
              className="hover:underline text-blue-600"
              href={`/posts/${post.slug}`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className="flex flex-col gap-y-2 w-[300px]">
        <input
          placeholder="Title"
          type="text"
          name="title"
          className="px-2 py-1 rounded-sm"
        />
        <textarea
          name="content"
          rows={5}
          placeholder="Content"
          className="px-2 py-1 rounded-sm"
        ></textarea>
        <button
          className="px-2 py-2 bg-blue-500 text-white rounded-sm"
          type="submit"
        >
          Create post
        </button>
      </form>
    </main>
  );
};

export default Posts;
