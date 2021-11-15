/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Create an instance of application */
const app = new Application();
/** Create an instance of router */
const router = new Router()

const getVariables = ({ params, response }) => {
  response.body = `${params.something}`;
};

/** In this situation, "something" is just a hold indicating that the parameter here will be 
 * stored with name "something".
*/
router.get("/key/:something", getVariables)

/** Ask the application to use the route that we have just defined */
app.use(router.routes());

app.listen({ port: 7777 });