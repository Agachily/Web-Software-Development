/** This file is used for operating the projects dataBase */
import { executeQuery } from "../database/database.js";

/** Create a project with the given name */
const createProject = async (name) => {
    await executeQuery("INSERT INTO projects (name) VALUES ($1);", name);
}

/** Find all the projects entry in the database */
const getAllProjects = async () => {
    let result = await executeQuery("SELECT * FROM projects;",);
    return result.rows
}

/** Select the project according to the given id */
const getById = async (id) => {
    let result = await executeQuery("SELECT * FROM projects WHERE id=($1);", id)

    if (result.rows && result.rows.length > 0) {
        return result.rows[0];
    }
    
    return { id: 0, name: "Unknown" };
}

/** Delete the project according to the given id */
const deleteById = async (id) => {
    await executeQuery("DELETE FROM projects WHERE id=($1);", id)
}

export {createProject, getAllProjects, deleteById, getById}