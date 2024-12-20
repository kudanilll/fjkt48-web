import { ObjectId } from "mongodb";

export type UserType = {
  _id?: ObjectId;
  email: string;
  password: string;
  name: string;
  image?: string;
  createdAt: Date;
};
