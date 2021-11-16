import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Use oak's session library to create a session */
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";

const app = new Application();
const session = new Session();
/** Use the session middleware to process the session, 
 * adding a session variable to the state object of context */
app.use(session.initMiddleware());

const greet = async ({ state, response }) => {
  let hasAppeared = await state.session.get("hasAppeared");
  if(hasAppeared){
    response.body = `Hi again!`;
  } else {
    await state.session.set("hasAppeared", true);
    response.body = `Welcome stranger!`;
  }
};

app.use(greet);

await app.listen({ port: 7777 });