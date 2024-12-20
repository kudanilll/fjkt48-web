import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client: any;
let clientPromise: any;

async function createTTLIndex(client: MongoClient) {
  try {
    // Buat TTL index (auth/pending)
    const db = client.db("auth");
    const pendingUsersCollection = db.collection("pending");
    await pendingUsersCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 600 } // 10 menit
    );
  } catch (error) {
    throw new Error(`failed to create TTL index: ${error}`);
  }
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri!, options).connect();
  }
  client = globalWithMongo._mongoClient;
  clientPromise = globalWithMongo._mongoClient;
  clientPromise.then((client: MongoClient) => createTTLIndex(client));
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri!, options);
  clientPromise = client.connect();
  clientPromise.then((client: MongoClient) => createTTLIndex(client));
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { client, clientPromise };
