"use server";
import clientPromise from "@/lib/mongodb/client";
import { hash } from "bcrypt";
import { signIn } from "next-auth/react";
import { isEmpty } from "validator";

type LoginForm = {
  email: string;
  password: string;
};

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export async function login(form: LoginForm, callbackUrl: string) {
  // validate
  if (isEmpty(form.email)) {
    return { res: null, error: true, message: "" };
  }
  if (isEmpty(form.password)) {
    return { res: null, error: true, message: "" };
  }
  const result = await signIn("credentials", {
    redirect: false,
    email: form.email,
    password: form.password,
    callbackUrl,
  });
  return { res: result, error: false, message: "Login sukses" };
}

export async function register(form: RegisterForm) {
  // validate
  if (isEmpty(form.name)) {
    return { res: null, error: true, message: "formulir 'nama' wajib di isi" };
  }
  if (isEmpty(form.email)) {
    return { res: null, error: true, message: "formulir 'email' wajib di isi" };
  }
  if (isEmpty(form.password)) {
    return {
      res: null,
      error: true,
      message: "formulir 'password' wajib di isi",
    };
  }

  const client = await clientPromise;
  const db = client.db();

  const existingUser = await db
    .collection("users")
    .findOne({ email: form.email });
  if (existingUser) {
    return { res: null, error: true, message: "Email sudah digunakan" };
  }

  const hashedPassword = await hash(form.password, 12);
  const result = await db.collection("users").insertOne({
    name: form.name,
    email: form.email,
    password: hashedPassword,
    image: "",
  });

  return { res: result, error: false, message: "Sukses membuat akun" };
}
