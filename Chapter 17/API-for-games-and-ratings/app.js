import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { executeQuery } from "./database/database.js";

const app = new Application();
const router = new Router();

const getGames = async ({response}) => {  
  const result = await executeQuery("SELECT * FROM games;")
  
  response.body = result.rows
}

const addGame = async ({ request, response }) => {
  const body = request.body({ type: "json" })
  const params = await body.value
  const name = params.name

  await executeQuery("INSERT INTO games (name) VALUES ($1);", name)
  response.body = {"status":"success"}
}

const getGame = async ({response, params}) => {  
  const gameID = params.id
  const result = await executeQuery("SELECT * FROM games WHERE id=($1);", gameID)
  console.log(result.rows)
  response.body = result.rows[0]
}

const deleteGame = async ({params, response}) => {
  const gameID = params.id
  await executeQuery(" DELETE FROM ratings WHERE game_id=($1);", gameID)
  await executeQuery(" DELETE FROM games WHERE id=($1);", gameID)

  response.body = {"status":"success"}
}

const addRating = async ({ params, request, response }) => {
  const gameID = params.id
  const body = request.body({ type: "json" })
  const content = await body.value
  const rating = Number(content.rating)

  await executeQuery("INSERT INTO ratings (rating, game_id) VALUES ($1, $2);", rating, gameID)
  response.body = {"status":"success"}
}

const getRatings = async ({response, params}) => {  
  const gameID = params.id
  const result = await executeQuery("SELECT * FROM ratings WHERE game_id=($1);", gameID)
  
  response.body = result.rows
}

router
  .get("/games", getGames)
  .post("/games", addGame)
  .get("/games/:id", getGame)
  .delete("/games/:id", deleteGame)
  .post("/games/:id/ratings", addRating)
  .get("/games/:id/ratings", getRatings)

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
