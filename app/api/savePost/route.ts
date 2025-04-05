"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { authorize } from "@/lib/firebase-admin";
import { errorStatus } from "../apiReturns";

export const GET = async (request: Request) => {
  try {
    const user: any = await authorize(request);
    if (user?.type === "Error") {
      throw new Error(user?.message);
    }
    const savedPosts = await prisma.posts.findMany({
      where: {
        userId: user?.userId,
      },
    });
    return new Response(
      JSON.stringify({
        type: "Success",
        data: savedPosts,
      })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        type: "Error",
        message: error.message,
      }),
      { status: errorStatus(error.message) }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const user = await authorize(request);
    if (user?.type === "Error") {
      throw new Error(user?.message);
    }
    const requestBody = await request.json();
    const saveNewPost = await prisma.posts.create({
      data: {
        ...requestBody,
        userId: user.userId,
      },
    });
    return new Response(
      JSON.stringify({
        type: "Success",
        data: saveNewPost,
      })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        type: "Error",
        message: error.message,
      }),
      { status: errorStatus(error.message) }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const user = await authorize(request);
    if (user?.type === "Error") {
      throw new Error(user?.message);
    }
    const requestBody = await request.json();
    const { id, updatedData } = requestBody;
    const updatePost = await prisma.posts.update({
      where: {
        id: id,
        data: updatedData,
      },
    });
    return new Response(
      JSON.stringify({
        type: "Success",
        data: updatePost,
      })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        type: "Error",
        message: error.message,
      }),
      { status: errorStatus(error.message) }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const user = await authorize(request);
    if (user?.type === "Error") {
      throw new Error(user?.message);
    }
    const requestBody = await request.json();
    const { id } = requestBody;
    await prisma.posts.delete({
      where: { id: id },
    });
    return new Response(
      JSON.stringify({
        type: "Success",
        data: `Post with id ${id} deleted successfully`,
      })
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        type: "Error",
        message: error.message,
      }),
      { status: errorStatus(error.message) }
    );
  }
};
