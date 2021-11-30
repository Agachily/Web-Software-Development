import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { required, validate} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const app = new Application();
const router = new Router();

const names = [];

const validationRules = {
    name: [required],
}

const listNames = ({ response }) => {
  response.body = names;
};

const postName = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const [passes, errors] = await validate(document, validationRules)
  if (passes) {
    names.push(document)
    response.status = 200
  } else {
    response.status = 400
    response.body = errors
  }
};

router.get("/names", listNames);
router.post("/names", postName);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
