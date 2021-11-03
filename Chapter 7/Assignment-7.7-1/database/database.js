/** 用于连接数据库并定义对数据库的操作 */
import { Pool } from "https://deno.land/x/postgres@v0.13.0/mod.ts";

/**定义数据库池中可用的并发连接的数量*/
const CONCURRENT_CONNECTIONS = 2

const connectionPool = new Pool({
    hostname: "hattie.db.elephantsql.com",
    database: "kdvkjrtj",
    user: "kdvkjrtj",
    password: "VeTtDvVIsM3Zgxadr4_dOacEiNJ6C-Ij",
    port: 5432,
  }, CONCURRENT_CONNECTIONS);

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