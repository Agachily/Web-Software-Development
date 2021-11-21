import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";

const app = new Application();
const router = new Router();
const session = new Session();
app.use(session.initMiddleware());

const showStatus = async ({ request, response, state }) => {
    const authenticated = await state.session.get("authenticated")
    if (authenticated) {
        response.body = "Authenticated"
    } else {
        response.body = "Not authenticated"
    }
};

const authenticate = async ({ request, response, state }) => {
    /** Get the name and password sent in the request */
    const body = request.body()
    const params = await body.value
    const password = params.get("password")
    const name = params.get("username")

    if (password === "00000000" && name === "Minuteman" ) {
        await state.session.set("authenticated", true)
        response.redirect("/")
    } else {
        response.status = 401 
    }
};

router.get("/", showStatus);
router.post("/", authenticate);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
