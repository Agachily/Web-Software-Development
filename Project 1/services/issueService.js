import { executeQuery } from "../database/database.js";

const createIssue = async (project_id, description) => {
    await executeQuery(
        "INSERT INTO project_issues (project_id, description) VALUES ($1, $2);",
        project_id, description,
    );
}

const getIssueByProjectId = async (project_id) => {
    let result = await executeQuery("SELECT * FROM project_issues WHERE project_id=($1)",project_id)
    return result.rows
}

const deleteIssueById = async (issue_id) => {
    await executeQuery("DELETE FROM project_issues WHERE id=($1);", issue_id)
}

export {createIssue, getIssueByProjectId, deleteIssueById}