/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Create an instance of application */
const app = new Application();
/** Create an instance of router */
const router = new Router()

const get = ({ response }) => {
  response.body = "GET request";
};

const post = ({ response }) => {
    response.body = "POST request";
};

const put = ({ response }) => {
    response.body = "PUT request";
};

/** And other request that has not been defined will be responded with 404 */
router.get("/", get).post("/", post).put("/", put)

/** Ask the application to use the route that we have just defined */
app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;