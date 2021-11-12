/** The server is created and the requests is dipathed in the file*/
import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as requestUtils from "./utils/requestUtils.js";
import * as projectController from "./controllers/projectController.js"
import * as issueController from "./controllers/issueController.js"

/** Configure the path to find the Eta files */
configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url)

    if (url.pathname === "/" && request.method === "GET") {
        //console.log("Execute1")
        return requestUtils.redirectTo("/projects")
    }else if (url.pathname === "/projects" && request.method === "GET") {
        //console.log("Execute2")
        return await projectController.viewProjects(request)
    } else if (url.pathname === "/projects" && request.method === "POST") {
        //console.log("Execute3")
        return await projectController.addProject(request)
    } else if (url.pathname.match("/projects/[0-9]+") && request.method === "GET") { 
        //console.log("Execute4")
        return await projectController.viewProject(request)
    } else if (url.pathname.match("/projects/[0-9]+/issues/[0-9]+") && request.method === "POST") {
        //console.log("Execute7")
        return await issueController.deleteIssue(request)
    } else if (url.pathname.match("/projects/[0-9]+/issues") && request.method === "POST") {
        //console.log("Execute6")
        return await issueController.createIssue(request)
    } else if (url.pathname.match("/projects/[0-9]+") && request.method === "POST") {
        //console.log("Execute5")
        return await projectController.deleteProjects(request)
    } else {
        return new Response("Not found", { status: 404 });
    }
}

let port = 7777;

if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

listenAndServe(`:${port}`, handleRequest);