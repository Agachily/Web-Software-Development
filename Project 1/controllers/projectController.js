/** The file is used for generate proper response for the request */
import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as projectService from "../services/projectService.js";
import * as issuesService from "../services/issueService.js"
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/** Process the request POST /projects */
const addProject = async (request) => {
    // Get the data sent in the form
    const formData = await request.formData()
    const name = formData.get("name")
    await projectService.createProject(name)

    return requestUtils.redirectTo("/projects")
}

/** Process the request GET /projects */
const viewProjects = async (request) => {
    // Get all the projects entry
    const data = {
        projects: await projectService.getAllProjects(),
    }
    return new Response(await renderFile("projects.eta", data), responseDetails);
}

/** Process the request POST /projects/id */
const deleteProjects = async (request) => {
    // Get the id
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    let id = urlParts[2]

    // Delete by id
    await projectService.deleteById(id)

    return requestUtils.redirectTo("/projects")
}

/** Process the request GET /projects/id */
const viewProject = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    let id = urlParts[2]
    const data = {
        project : await projectService.getById(id),
        issues : await issuesService.getIssueByProjectId(id)
    }

    return new Response(await renderFile("project.eta", data), responseDetails);
}

export {addProject, viewProjects, deleteProjects, viewProject}