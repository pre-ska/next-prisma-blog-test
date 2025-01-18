"use server"; // sve funkcije u ovom fileu su server funkcije

import { prisma } from "@/lib/db";
import { createSlug } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;

  //   if (!title) {
  //     throw new Error("Title is required");
  //   }

  //   if (title.length > 100) {
  //     throw new Error("Title is too long");
  //   }

  //   if (title.length < 3) {
  //     throw new Error("Title is too short");
  //   }

  //   if (!formData.get("content")) {
  //     throw new Error("Content is required");
  //   }

  try {
    await prisma.post.create({
      data: {
        title,
        content: formData.get("content") as string,
        slug: createSlug(title || ""),
        author: {
          // koji user je kreirao ovaj post, connect radi upravo to u bazi
          connect: {
            email: "john@email.com",
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          `Failed to create post: ${title}. This title is already taken.`
        );
      }
    }
  }

  revalidatePath("/posts");
}

export async function editPost(formData: FormData, id: string) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      slug: createSlug(title || ""),
    },
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: {
      id,
    },
  });
}
