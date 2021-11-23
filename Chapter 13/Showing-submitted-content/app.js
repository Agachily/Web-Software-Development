import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const data = {
    content: '',
}

const viewForm = ({ render }) => {
    render("index.eta", data);
};

const getContent = async ({ request, response }) => {
    const body = request.body()
    const params = await body.value
    response.body = params.get("content")
}

router.get("/", viewForm).post("/", getContent)

app.use(router.routes());

app.listen({ port: 7777 });