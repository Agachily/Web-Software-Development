import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();

const setAdmin = async ({ cookies, response, request }) => {
    if (request.url.pathname.includes("admin")){
        /** Set the cookie through the context object */
        await cookies.set("admin", "true")
    } else {
        await cookies.set("admin", "false")
    }
    response.body = "Hello world!";
};

app.use(setAdmin);

app.listen({ port: 7777 });