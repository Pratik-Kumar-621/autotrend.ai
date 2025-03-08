"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const features = await prisma.feature.findMany();
    features.forEach((feature) => {
      if (feature.image) {
        feature.image = Buffer.from(feature.image, "base64").toString("binary");
      }
    });
    return new Response(JSON.stringify(features), {
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
    if (data.image) {
      data.image = Buffer.from(data.image, "binary").toString("base64");
    }
    const newFeature = await prisma.feature.create({
      data: data,
    });
    return new Response(JSON.stringify(newFeature), {
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
    const { id, title, description, image } = data;
    if (data.image) {
      data.image = Buffer.from(data.image, "binary").toString("base64");
    }
    const updatedFeature = await prisma.feature.update({
      where: { id: id },
      data: { title, description, image },
    });
    return new Response(JSON.stringify(updatedFeature), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();
    await prisma.feature.delete({
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
