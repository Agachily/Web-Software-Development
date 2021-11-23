import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  render("index.eta");
};

const submitForm = async ({ response, request }) => {
  const body = request.body();
  const params = await body.value;
  const name = params.get("name");
  const address = params.get("address")

  if (name.length < 4) {
    response.body = "Invalid name"
    return
  } 
  if (address.length < 6) {
    response.body = "Invalid address"
    return
  } 

    response.body = "Ok!"
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
