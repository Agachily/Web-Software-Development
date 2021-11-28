import { executeQuery } from "../database/database.js";
import * as questionAnswerService from "./questionAnswerService.js";

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

  /** Add the flag to every Question that whether it could be deleted */
  for (let i = 0; i < res.rows.length; i++) {
    const answer = await questionAnswerService.getAnswerByQuestionId(res.rows[i].id)
    if (answer.length > 0) {
      res.rows[i].noAnswer = false
    } else {
      res.rows[i].noAnswer = true
    }
  }

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

export { addQuestion, getQuestionsByUserId, getQuestionByQuestionID,deleteQuestion }