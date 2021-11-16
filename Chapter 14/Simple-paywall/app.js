import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Use oak's session library to create a session */
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";

const app = new Application();
const session = new Session();
/** Use the session middleware to process the session, 
 * adding a session variable to the state object of context */
app.use(session.initMiddleware());

const paywall = async ({ state, response }) => {
    let count = await state.session.get("count");
    if(!count){
        count = 1
        state.session.set("count", count)
        response.body = "Welcome! Here are the truths that you are seeking for!"
    } else if (count < 3) {
        state.session.set("count", count+1)
        response.body = "Welcome! Here are the truths that you are seeking for!"
    } else {
        state.session.set("count", count+1)
        response.body = "No more free truths. Payment required."
    }
};

app.use(paywall);

await app.listen({ port: 7777 });