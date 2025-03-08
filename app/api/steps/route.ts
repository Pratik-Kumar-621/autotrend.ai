"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const steps = await prisma.step.findMany();
    return new Response(JSON.stringify(steps), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const newStep = await prisma.step.create({
      data: data,
    });
    return new Response(JSON.stringify(newStep), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT = async (request: Request) => {
  try {
    const data = await request.json();
    const { id, ...updateData } = data;

    const updatedFeature = await prisma.step.update({
      where: { id: id },
      data: updateData,
    });
    return new Response(JSON.stringify(updatedFeature), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();
    await prisma.step.delete({
      where: { id: id },
    });
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
