import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, questionText) => {
  await executeQuery(
    /** Use the ` simbol so the statement can be in multiple lines */
    "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)",
    userId, title, questionText
  );
};

export { addQuestion }