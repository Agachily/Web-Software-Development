/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Create an instance of application */
const app = new Application();
/** Create an instance of router */
const router = new Router()

const getRoot= ({ response }) => {
    response.redirect("/names")
};

const getNames = ({ response }) => {
    response.body = 'Hello names!'
}

const postNames = ({ response }) => {
    response.redirect("/names")
}

router.get("/", getRoot).get('/names', getNames).post('/names', postNames)

/** Ask the application to use the route that we have just defined */
app.use(router.routes());

app.listen({ port: 7777 });