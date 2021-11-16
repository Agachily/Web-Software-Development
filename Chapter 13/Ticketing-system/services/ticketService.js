import { executeQuery } from "../database/database.js";

const getTickets = async() => {
    let result = await executeQuery("SELECT * FROM tickets;",);
    return result.rows
}

const addTickets = async(content) => {
    await executeQuery("INSERT INTO tickets (content, reported_on) VALUES (($1), NOW());", content)
}

const resolveTickets = async(id) => {
    await executeQuery("UPDATE tickets SET resolved_on=NOW() WHERE id=($1);", id)
}

const deleteTickets = async(id) => {
    await executeQuery("DELETE FROM tickets WHERE id=($1);", id)
}

export { getTickets, addTickets, resolveTickets, deleteTickets }