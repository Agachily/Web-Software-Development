/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Create an instance of application */
const app = new Application();
/** Create an instance of router */
const router = new Router()

const greet = ({ response }) => {
  response.body = "Hello world!";
};

const work = ({ response }) => {
    response.body = "Yes, it works!";
};

/** router's get metod also returns a router object */
router.get("/", greet).get("/test", work)

/** Ask the application to use the route that we have just defined */
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;