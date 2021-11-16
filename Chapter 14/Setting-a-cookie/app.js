import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();

const hello = async ({ cookies, response }) => {
    await cookies.set("hello", "world")
    response.body = "Hello world!";
};

app.use(hello);

app.listen({ port: 7777 });