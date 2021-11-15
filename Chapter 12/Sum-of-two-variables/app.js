/** Routes are created using the Router class from oak */
import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
/** Create an instance of application */
const app = new Application();

const getSum = ({request, response}) => {
    /** Get the parameters send together with the get rquest */
    let p1 = request.url.searchParams.get("number1")
    let p2 = request.url.searchParams.get("number2")
    console.log(p1)
    console.log(p2)
    if ((p1 !== null) && (p2 !== null)){

        response.body = Number(p1) + Number(p2)
    } else {
        response.body = "Invalid parameters."
    }
}

/** There the router is not used, so all the requests will be handled by the getSum middlare */
app.use(getSum)

app.listen({ port: 7777 });