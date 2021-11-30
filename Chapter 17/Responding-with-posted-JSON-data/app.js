import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();
const router = new Router();

const postJson = async ({ response, request }) => {
    const body = request.body({ type: "json" })
    const content = await body.value
    response.body = content
};

router.post("/", postJson);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
