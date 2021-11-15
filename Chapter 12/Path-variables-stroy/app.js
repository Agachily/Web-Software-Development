/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
/** Create an instance of router */
const app = new Application();
const router = new Router()

app.use(renderMiddleware);

const data = {
    name: "Batman",
    emotion: "tired",
}

const getRoot= ({ render }) => {
    render("index.eta", data)
};

const getStory = ({ params, render }) => {
    data.name = params.name
    data.emotion = params.emotion
    render("index.eta", data)
    data.name = 'Batman'
    data.emotion = 'tired'
}

router.get("/", getRoot).get('/name/:name/emotion/:emotion', getStory)

/** Ask the application to use the route that we have just defined */
app.use(router.routes());

app.listen({ port: 7777 });