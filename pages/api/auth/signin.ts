"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import * as jwt from "jose";
// import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z.string().min(1, "Password is required"),
});
const algo = "HS256";

export default async function signin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const validated = await loginSchema.safeParseAsync({ email, password }); // delay the validation until the last moment
    if (!validated.success) {
        return { error: validated.error.toString() };
    }
    const userEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userEmail) {
      return { error: "User email not found" };
    }

    const passwordMatch = await bcrypt.compare(password, userEmail.password);
    if (!passwordMatch) {
      return { error: "User password not found" };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new jwt.SignJWT({ email: userEmail.email })
      .setProtectedHeader({ alg: algo })
      .setExpirationTime("24h")
      .sign(secret);

    cookies().set("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      secure: process.env.NODE_ENV === "production",
    });

    return {
      data: {
        firstName: userEmail.first_name,
        lastName: userEmail.last_name,
        city: userEmail.city,
        phone: userEmail.phone,
        email: userEmail.email,
        token: token,
      },
    };
  } catch (error: any) {
    return { error };
  }
}
