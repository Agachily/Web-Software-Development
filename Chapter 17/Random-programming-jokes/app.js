import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import { fetchRandomJoke } from "./services/jokeService.js";

const app = new Application();
app.use(errorMiddleware);
app.use(renderMiddleware);

const router = new Router();


const showPage = async ({ render }) => {
  const data = await fetchRandomJoke()
  console.log(data)
  render("index.eta", data);
};

router.get("/", showPage);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
