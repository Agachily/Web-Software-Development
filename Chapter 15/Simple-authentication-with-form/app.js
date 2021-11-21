import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();
const session = new Session();
app.use(session.initMiddleware());

app.use(renderMiddleware);

const processFrom = async ({request, state, request}) => {
  const body = request.body();
  const params = await body.value;
  const password = params.get("password");

  if (password === "hippopotamus") {
    await state.session.set("authenticated", true);
    response.body = 'Authentication successful.'
  } else {
    response.body = 'Wrong password.'
  }
}

const showMain = async ({ render, state }) => {
  const authenticated = await state.session.get("authenticated")

  if (authenticated) {
    render('secret.eta')
  } else {
    render('index.eta')
  }
}

router.get("/", showMain).post("/", processFrom)

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app
