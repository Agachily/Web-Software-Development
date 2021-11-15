/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Create an instance of application */
const app = new Application();
/** Create an instance of router */
const router = new Router()

const getSum = ({ params, response }) => {
    let first = Number(params.first)
    let second = Number(params.second)
    response.body = `${first+second}`;
};

router.get("/sum/:first/:second", getSum)

/** Ask the application to use the route that we have just defined */
app.use(router.routes());

app.listen({ port: 7777 });