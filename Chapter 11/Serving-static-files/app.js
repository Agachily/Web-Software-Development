import { Application, send } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import {serveStaticFiles} from "./middlewares/serveStaticMiddleware.js"

const app = new Application();

const greet = ({ response }) => {
  response.body = "Hello world!";
};

app.use(serveStaticFiles);
app.use(greet);

await app.listen({ port: 7777 });
export default app;