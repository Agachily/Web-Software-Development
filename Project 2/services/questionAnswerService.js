import { executeQuery } from "../database/database.js";

const addAnswerOptions = async (id, optionText, isCorrect) => {
    await executeQuery(
        "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1, $2, $3);",
        id, optionText, isCorrect,
    )
}

/** Get the all the answer options of a specific question */
const getAnswerByQuestionId = async (id) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=($1);",
        id,
    )
      
    return res.rows
}

const deleteAnswerOption = async (questionId, optionId) => {
    await executeQuery(
        "DELETE FROM question_answer_options WHERE question_id=($1) AND id=($2);",
        questionId, optionId
    )
}

const getCorrectOption = async (questionId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answer_options WHERE question_id=($1) AND is_correct=true;",
        questionId,
    )

    return res.rows
}

export { addAnswerOptions, getAnswerByQuestionId, deleteAnswerOption, getCorrectOption }