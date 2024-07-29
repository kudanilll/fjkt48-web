"use server";
import { LoginFormData, RegisterFormData } from "@/models/schema/form";
import { UserType } from "@/models/types/user.type";
import { OTPData } from "@/utils/otp";
import { hash } from "bcrypt";
import { signIn } from "next-auth/react";
import { isEmpty } from "validator";
import clientPromise from "@/lib/mongodb/client";

async function getUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("users");
  return await usersCollection.findOne({ email });
}

async function createUser(user: UserType) {
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("users");
  await usersCollection.insertOne(user);
}

async function updateUser(email: string, updates: Partial<UserType>) {
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("users");
  await usersCollection.updateOne({ email }, { $set: updates });
}

export async function deletePendingUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("auth");
  return await db.collection("pending").deleteOne({ email });
}

export async function getPendingUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("pending");
  return await usersCollection.findOne({ email });
}

export async function login(form: LoginFormData, callbackUrl: string) {
  // validation
  if (isEmpty(form.email)) {
    return { res: null, error: true, message: "'email' form required" };
  }
  if (isEmpty(form.password)) {
    return { res: null, error: true, message: "'password' form required" };
  }
  const result = await signIn("credentials", {
    redirect: false,
    email: form.email,
    password: form.password,
    callbackUrl,
  });
  return { res: result, error: false, message: "login success" };
}

export async function startRegister(
  form: RegisterFormData,
  otp: OTPData
): Promise<{ res: any; error: boolean; message: string }> {
  // validation
  if (isEmpty(form.name)) {
    return { res: null, error: true, message: "'name' form required" };
  }
  if (isEmpty(form.email)) {
    return { res: null, error: true, message: "'email' form required" };
  }
  if (isEmpty(form.password)) {
    return {
      res: null,
      error: true,
      message: "'password' form required",
    };
  }

  const existingUser = await getUserByEmail(form.email);
  if (existingUser)
    return { res: null, error: true, message: "email already in use" };

  // create pending user
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("pending");
  const result = await usersCollection.insertOne({
    name: form.name,
    email: form.email,
    password: form.password,
    otp: otp.otp,
    otpExpires: otp.expiresAt,
    createdAt: new Date(),
  });

  return {
    res: result,
    error: false,
    message: "success create pending account",
  };
}

export async function register(user: UserType): Promise<{
  res: any;
  error: boolean;
  message: string;
}> {
  const hashedPassword = await hash(user.password, 12);
  const result = await createUser({
    name: user.name,
    email: user.email,
    password: hashedPassword,
    image: user.image,
    createdAt: user.createdAt,
  });
  return { res: result, error: false, message: "success create account" };
}
