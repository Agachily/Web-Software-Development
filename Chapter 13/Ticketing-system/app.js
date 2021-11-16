import { Application, Router } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import renderMiddleware from "./middlewares/renderMiddleware.js";
import * as ticketService from "./services/ticketService.js"

const app = new Application()
const router = new Router()

app.use(renderMiddleware)

const showTickets = async ({ render }) => {
    /** Get all the data */
    const data = {
        tickets : await ticketService.getTickets(),
    }

    render("index.eta", data)
}

const createTickets = async ({ request, response }) => {
    /** Get the content send in the post method */
    const body = request.body()
    const params = await body.value
    let content = params.get("content")

    await ticketService.addTickets(content)
    response.redirect("/tickets")
}

const resolveTickets = async ({ params, response }) => {
    // Get the id
    let id = params.id
    // Update data by id
    await ticketService.resolveTickets(id)
    // Redirect
    response.redirect("/tickets")
}

const deleteTickets = async ({params, response}) => {
    let id = params.id
    await ticketService.deleteTickets(id)
    response.redirect("/tickets")
}

router
    .get("/tickets", showTickets)
    .post("/tickets", createTickets)
    .post("/tickets/:id/resolve", resolveTickets)
    .post("/tickets/:id/delete", deleteTickets)

app.use(router.routes())

app.listen({ port: 7777 })
