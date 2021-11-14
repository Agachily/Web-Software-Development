import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { timer } from "./middlewares/timerMiddleware.js";
const app = new Application();

const hello = ({ response }) => {
  response.body = "Hello world!";
};

app.use(timer)
app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;