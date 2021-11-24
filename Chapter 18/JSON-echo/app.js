import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();
const router = new Router();

const echo = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  response.body = document;
};

const echoName = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  response.body = { name: document.name };
};

router.post("/", echo);
router.post("/name", echoName);

app.use(router.routes());

export { app };

/** if you wish to run the application, uncomment the following line
for local testing -- remember to comment it when returning the app
for testing */
app.listen({ port: 7777 });
