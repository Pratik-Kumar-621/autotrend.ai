 "use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const suggestions = await prisma.suggestion.findMany({
      orderBy: { sequence: "asc" },
    });
    return new Response(
      JSON.stringify({ type: "Success", data: suggestions }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ type: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const { text, sequence } = data;

    const newSuggestion = await prisma.suggestion.create({
      data: { text, sequence },
    });

    return new Response(
      JSON.stringify({
        type: "Success",
        data: newSuggestion,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ type: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const data = await request.json();
    const { id, text, sequence } = data;

    const updatedSuggestion = await prisma.suggestion.update({
      where: { id },
      data: { text, sequence },
    });

    return new Response(
      JSON.stringify({
        type: "Success",
        data: updatedSuggestion,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ type: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { id } = await request.json();

    await prisma.suggestion.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({
        type: "Success",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ type: "Error", error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

