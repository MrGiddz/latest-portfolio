import "server-only";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "latest_portfolio";

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

function createClientPromise() {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }
  const client = new MongoClient(uri);
  return client.connect();
}

export function isMongoConfigured() {
  return Boolean(uri);
}

export async function getMongoDb() {
  const globalRef = global as typeof globalThis & {
    __mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalRef.__mongoClientPromise) {
    globalRef.__mongoClientPromise = createClientPromise();
  }

  const client = await globalRef.__mongoClientPromise;
  return client.db(dbName);
}
