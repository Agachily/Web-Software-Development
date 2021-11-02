/**用于chat应用与数数据库之间进行的操作 */
import { executeQuery } from "../database/database.js";

/**向数据库中发送数据 */
const create = async (sender, message) => {
    await executeQuery(
        "INSERT INTO messages (sender, message) VALUES ($1, $2);",
        sender,
        message,
    )
}

/** 从数据库中获取数据 */
const getData = async () => {
    let result = await executeQuery("SELECT * FROM messages;")
    return result.rows
}

export {create, getData}