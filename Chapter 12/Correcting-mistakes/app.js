import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = new Application();
const router = new Router();

const message = ({ response }) => {
  response.body = "Postman Pat";
};

router.post("/", message);

app.use(errorMiddleware);
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
