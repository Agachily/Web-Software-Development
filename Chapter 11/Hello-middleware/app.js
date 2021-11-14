import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {log} from "./middlewares/loggingMiddleware"
const app = new Application();

const hello = ({ response }, next) => {
  response.body = "Hello world!";
  next()
};

app.use(hello);
app.use(log)

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;