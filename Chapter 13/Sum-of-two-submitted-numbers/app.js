import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const viewForm = ({ render }) => {
    render("index.eta");
};

const getContent = async ({ request, response }) => {
    const body = request.body()
    const params = await body.value
    response.body = Number(params.get("first")) + Number(params.get("second"))
}

router.get("/", viewForm).post("/", getContent)

app.use(router.routes());

app.listen({ port: 7777 });