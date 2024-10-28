"use server";
import { LoginFormData, RegisterFormData } from "@/models/schema/form";
import { OTPData } from "@/lib/otp";
import { hash } from "bcrypt";
import { ObjectId } from "mongodb";
import { getSession, signIn, signOut } from "next-auth/react";
import { toast } from "sonner";
import { isEmpty } from "validator";
import { clientPromise } from "@/lib/mongodb/client";
import { UserType } from "@/models/types/user.type";
import { getUserByEmail, createUser } from "./service";

export async function login(
  form: LoginFormData,
  callbackUrl: string,
  router: any
) {
  // validation
  // if (isEmpty(form.email)) {
  //   toast.error("Formulir 'email' wajib diisi");
  //   return { error: true, message: "'email' form required" };
  // }
  // if (isEmpty(form.password)) {
  //   toast.error("Formulir 'password' wajib diisi");
  //   return { error: true, message: "'password' form required" };
  // }
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
  // .then((response) => {
  //   if (response?.error) {
  //     toast.error("Login gagal", { description: response?.error });
  //     return { error: true, message: response?.error };
  //   }
  //   toast.success("Login berhasil");
  //   router.push(callbackUrl);
  // })
  // .catch((err) => {
  //   toast.error("Login gagal", { description: err });
  //   return { error: true, message: err };
  // });
  return result;
  // const result = await signIn("credentials", {
  //   redirect: false,
  //   email: form.email,
  //   password: form.password,
  //   callbackUrl,
  // });
  // return { res: result, error: false, message: "login success" };
}

export async function loginGoogle(
  callbackUrl: string
  // router: any
) {
  // signIn("google", { callbackUrl: callbackUrl, redirect: false })
  //   .then(async (response) => {
  //     if (response?.error) {
  //       toast.error("Login gagal", { description: response?.error });
  //       return;
  //     }
  //     const session = await getSession();
  //     const email = session!.user?.email;

  //     if (!session || !email) {
  //       toast.error("Gagal mendapatkan informasi pengguna");
  //       return;
  //     }

  //     // cek email
  //     const existingUser = await getUserByEmail(email);
  //     if (existingUser) {
  //       toast.error("Akun sudah terdaftar");
  //       return;
  //     }

  //     await createUser({
  //       _id: new ObjectId(session!.user?.id!),
  //       name: session!.user?.name!,
  //       email: session!.user?.email!,
  //       password: "",
  //       image: session!.user?.image!,
  //       createdAt: new Date(),
  //     });

  //     toast.success("Login berhasil");
  //     router.push(callbackUrl);
  //   })
  //   .catch((err) => {
  //     toast.error("Login gagal", { description: err });
  //     return { error: true, message: err };
  //   });
  try {
    const result = await signIn("google", { callbackUrl, redirect: false });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    const session = await getSession();
    const email = session?.user?.email;

    if (!session || !email) {
      return { success: false, error: "Failed to get user information" };
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return { success: false, error: "Account already registered" };
    }

    await createUser({
      _id: new ObjectId(session.user?.id!),
      name: session.user?.name!,
      email: session.user?.email!,
      password: "",
      image: session.user?.image!,
      createdAt: new Date(),
    });

    return { success: true, callbackUrl: result?.url || callbackUrl };
  } catch (error) {
    console.error("Google login error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function logout() {
  signOut({ callbackUrl: "/home", redirect: true })
    .then(() => toast.success("Berhasil keluar"))
    .catch((err) => toast.error("Error", { description: err }));
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
