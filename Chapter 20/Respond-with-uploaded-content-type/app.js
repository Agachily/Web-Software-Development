import { Application, Router, } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);


const showForm = ({ render }) => {
  render("index.eta");
};

const processUpload = async (context) => {
  const body = context.request.body({ type: "form-data" });
  const reader = await body.value;
  const data = await reader.read();
  const fileDetails = data.files[0];

  let type = fileDetails.contentType;
  console.log(type)

  context.response.body = `${type}`
};

router.get("/", showForm);
router.post("/", processUpload);

app.use(router.routes());

app.listen({ port: 7777 });