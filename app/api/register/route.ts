import prisma from "@/app/libs/prismaDB";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const body = await req.json();
  const { name, email, password } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({ data: { email, name, hashedPassword } });

  return NextResponse.json(user);
}