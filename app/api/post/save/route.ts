"use server";

import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/firebase-admin";

const prisma = new PrismaClient();

const authorize = async (request: Request) => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized: Missing or invalid Authorization header");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken; // Return decoded token if needed for further use
  } catch (error) {
    console.log(error);

    throw new Error("Unauthorized: Invalid token");
  }
};

export const GET = async (request: Request) => {
  try {
    await authorize(request);
    const posts = await prisma.posts.findMany();
    console.log(posts);

    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message.split(" ")[0] === "Unauthorized:" ? 401 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (request: Request) => {
  try {
    await authorize(request);
    const data = await request.json();
    const newPost = await prisma.posts.create({
      data: data,
    });
    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message.split(" ")[0] === "Unauthorized:" ? 401 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT = async (request: Request) => {
  try {
    await authorize(request);
    const data = await request.json();
    const { id, ...updateData } = data;

    const updatedPost = await prisma.posts.update({
      where: { id: id },
      data: updateData,
    });
    return new Response(JSON.stringify(updatedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message.split(" ")[0] === "Unauthorized:" ? 401 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    await authorize(request);
    const { id } = await request.json();
    await prisma.posts.delete({
      where: { id: id },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: error.message.split(" ")[0] === "Unauthorized:" ? 401 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
