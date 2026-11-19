import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL || "",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
      oshiId: {
        type: "string",
        required: false,
        fieldName: "oshi_id",
      },
      bio: {
        type: "string",
        required: false,
      },
    },
  },
});
