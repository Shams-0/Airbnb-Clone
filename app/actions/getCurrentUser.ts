import { getServerSession } from "next-auth/next"

import { authOption } from "@/pages/api/auth/[...nextauth]"
import prisma from "../libs/prismaDB"

export async function getSession() {
  return await getServerSession(authOption)
}

export default async function getCurrentUser() {
  try {

    const session = await getSession()
    if (!session?.user?.email) null;
    const currentUser = await prisma.user.findUnique({ where: { email: session?.user?.email as string } })
    if (!currentUser) null;

    return currentUser;
  } catch (error) {
    return null
  }
}