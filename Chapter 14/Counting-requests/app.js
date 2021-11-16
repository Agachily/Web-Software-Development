import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Use oak's session library to create a session */
import { Session } from "https://deno.land/x/oak_sessions@v3.1.3/mod.ts";

const app = new Application();
const session = new Session();
/** Use the session middleware to process the session, 
 * adding a session variable to the state object of context */
app.use(session.initMiddleware());

const counter = async (context) => {
  let count = await context.state.session.get("count");
  if (!count) {
    count = 0;
  }
  await context.state.session.set("count", Number(count) + 1);

  context.response.body = `${Number(count) + 1}`;
};

app.use(counter);

await app.listen({ port: 7777 });