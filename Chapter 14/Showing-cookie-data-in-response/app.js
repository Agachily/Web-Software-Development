import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();

const setResponse = async ({ cookies, response }) => {
    let secret = await cookies.get("secret")
    if (secret) {
        response.body = `The secret is ${secret}`
    } else {
        response.body = 'The secret is undefined'
    }
};

app.use(setResponse);

app.listen({ port: 7777 });