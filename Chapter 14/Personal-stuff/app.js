import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Use oak's session library to create a session */
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";
import render from "./middlewares/renderMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router()
const session = new Session();
/** Use the session middleware to process the session, 
 * adding a session variable to the state object of context */
app.use(session.initMiddleware());
app.use(renderMiddleware)

const addItem = async ({ state, response, request }) => {
    /** Stored the data sent by the post method in session */
    const body = request.body();
    const params = await body.value;
    let items = await state.session.get("items")
    if(!items){
        items = []
    }
    items.push(params.get("item"))
    await state.session.set("items", items)
    response.redirect("/")
};

const showItem = async ({ state, render }) => {
    let items = await state.session.get("items")
    if(!items){
        items = []
    }
    render("index.eta", {items: items})
}

router.get("/", showItem).post("/", addItem)

app.use(router.routes())


if (!Deno.env.get("TEST_ENVIRONMENT")) {
    app.listen({ port: 7777 });
}
  
export default app;