import { executeQuery } from "../database/database.js";

const addQuestion = async (userId, title, questionText) => {
  await executeQuery(
    /** Use the ` simbol so the statement can be in multiple lines */
    "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)",
    userId, title, questionText
  );
};

const getQuestionsByUserId = async (userId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE user_id=($1) ",
    userId,
  )

  return res.rows
}

const getQuestionByQuestionID = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE id=($1) ",
    id,
  )
  
  return res.rows[0]
}

const deleteQuestion = async (id) => {
  await executeQuery(
    "DELETE FROM questions WHERE id=($1);",
    id
  )
}

const getRandomQuestion = async () => {
  const res = await executeQuery("SELECT * FROM questions")
  const questionNumber = res.rows.length
  if (questionNumber === 0) {
    return null
  } else {
    const random = Math.floor(Math.random() * questionNumber)
    return res.rows[random]
  }
}

export { addQuestion, getQuestionsByUserId, getQuestionByQuestionID, deleteQuestion, getRandomQuestion }