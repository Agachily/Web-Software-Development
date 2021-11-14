import { Application } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const app = new Application();

const greet = ({request, response}) => {
    let path = request.url.pathname
    response.body = `${path}`;
};

app.use(greet);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
    app.listen({ port: 7777 });
}

export default app;
