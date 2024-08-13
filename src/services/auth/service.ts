"use server";
import { clientPromise } from "@/lib/mongodb/client";
import { UserType } from "@/models/types/user.type";

export async function getUserByEmail(email: string) {
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("users");
  return await usersCollection.findOne({ email });
}

export async function createUser(user: UserType) {
  const client = await clientPromise;
  const db = client.db("auth");
  const usersCollection = db.collection("users");
  await usersCollection.insertOne(user);
}

export async function updateUser(email: string, updates: Partial<UserType>) {
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
