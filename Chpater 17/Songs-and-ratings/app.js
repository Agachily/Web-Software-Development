import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application();
const router = new Router();

const getSongs = async ({response}) => {  
  const result = await executeQuery("SELECT * FROM songs;")
  
  response.body = result.rows
}

const getSong = async ({response, params}) => {  
  const songID = params.id
  const result = await executeQuery("SELECT * FROM songs WHERE id=($1);", songID)
  console.log(result.rows)
  response.body = result.rows[0]
}

const postSong = async ({request, response}) => {
  const body = request.body({ type: "json" })
  const params = await body.value
  console.log(params)
  const name = params.name
  const rating = params.rating

  await executeQuery("INSERT INTO songs (name, rating) VALUES ($1, $2);", name, rating)
  response.body = {"status":"success"}
}

const deleteSong = async ({params, response}) => {
  const songID = params.id
  await executeQuery(" DELETE FROM songs WHERE id=($1);", songID)

  response.body = {"status":"success"}
}


router
  .get("/songs", getSongs)
  .get("/songs/:id", getSong)
  .post("/songs", postSong)
  .delete("/songs/:id", deleteSong)

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
