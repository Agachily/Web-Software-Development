import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as issueService from "../services/issueService.js";
import * as requestUtils from "../utils/requestUtils.js";

/** Process request to /projects/{id}/issues */
const createIssue = async (request) => {
    // Get id
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/")
    let id = urlParts[2]

    // Get issues description
    const formData = await request.formData()
    const description = formData.get("description")

    await issueService.createIssue(id, description)

    return requestUtils.redirectTo(`/projects/${id}`)
}

/** Process request to /projects/{id}/issues/{issue_id} */
const deleteIssue = async (request) => {
    // Get project id and issue id
    const url = new URL(request.url)
    const urlParts = url.pathname.split("/")
    let project_id = urlParts[2]
    let issue_id = urlParts[4]

    await issueService.deleteIssueById(issue_id)
    return requestUtils.redirectTo(`/projects/${project_id}`)
}

export {createIssue, deleteIssue}