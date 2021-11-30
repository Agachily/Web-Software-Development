import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();
const router = new Router();

const data = {
  "hello" : "world",
}

const hello = ({ response }) => {
  response.body = data;
};

router.get("/", hello);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
