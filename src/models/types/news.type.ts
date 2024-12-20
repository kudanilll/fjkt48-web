import { ObjectId } from "mongodb";

export type NewsType = {
  _id: ObjectId;
  title: string;
  thumbnail: string;
  date: string;
  slug: string;
  category: string;
};
