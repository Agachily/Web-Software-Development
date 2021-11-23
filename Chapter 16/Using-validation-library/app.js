import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { isNumeric, minLength, required, validate, maxNumber, minNumber
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const getData = async (request) => {
  const data = {
    name: "",
    yearOfBirth: "",
    errors: null,
  };

  if (request) {
    const body = request.body();
    const params = await body.value;
    data.name = params.get("name");
    data.yearOfBirth = params.get("yearOfBirth");
  }

  return data;
}

const validationRules = {
  name: [required, minLength(4)],
  yearOfBirth: [required, minNumber(1900), maxNumber(2000), isNumeric],
}

const showForm = ({ render }) => {
  render("index.eta", { errors: [], name: "", yearOfBirth: "" });
};

const submitForm = async ({ request, response, render }) => {
  const data = await getData(request)
  const [passes, errors] = await validate(data, validationRules)

  if (!passes) {
    data.errors = errors;
    render("index.eta", data);
  } else {
    // data was ok, could store it
    response.redirect("/");
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
