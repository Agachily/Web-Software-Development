import { executeQuery } from "../database/database.js";

const addAnswerOptions = async (id, optionText, isCorrect) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3);",
        id, optionText, isCorrect,
    )
}

const getAnswerByQuestionId = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=($1);",
        id,
    )
      
    return res.rows
}

const deleteAnswerOption = async (questionID, optionId) => {
    await executeQuery(
        "DELETE FROM question_answer_options WHERE question_id=($1) AND id=($2);",
        questionID, optionId
    )
}

export { addAnswerOptions, getAnswerByQuestionId, deleteAnswerOption }