import { Pool } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

const CONCURRENT_CONNECTIONS = 3;
const connectionPool = new Pool({
  hostname: "hattie.db.elephantsql.com",
  database: "kdvkjrtj",
  user: "kdvkjrtj",
  password: "VeTtDvVIsM3Zgxadr4_dOacEiNJ6C-Ij",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

/** This method is used for execute a SQL statement and get the returned results */
const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.log("Unable to release database connection.");
        console.log(e);
      }
    }
  }

  return response;
};

export { executeQuery };