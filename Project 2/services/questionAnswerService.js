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

const storePostAnswer = async (userId, questionId, optionId, isCorrect) => {
    await executeQuery(
        "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1, $2, $3, $4);",
        userId, questionId, optionId, isCorrect,
    )
}

const getUserAnswerByUserId = async(userId) => {
    const res = await executeQuery(
        "SELECT * FROM question_answers WHERE user_id=($1);",
        userId,
    )

    return res.rows
}

/** Get the answers give to the qestions created by the user */
const answerToQuesOfUser = async(userId) => {
    const res = await executeQuery(
        `SELECT * FROM question_answers LEFT OUTER JOIN questions 
            on questions.id=question_answers.question_id 
            where questions.user_id=($1);`,
        userId,
    )

    return res.rows
}

/** five users with the most answered questions */
const getFiveUser = async () => {
    const res = await executeQuery(
    `SELECT users.email as email, count(*) as count FROM users
        JOIN question_answers ON users.id = question_answers.user_id
        GROUP BY users.email
        ORDER BY count desc
        LIMIT 5;`
    )

    return res.rows
}

export { 
    addAnswerOptions, 
    getAnswerByQuestionId, 
    deleteAnswerOption, 
    getCorrectOption, 
    storePostAnswer,
    getUserAnswerByUserId,
    answerToQuesOfUser,
    getFiveUser
}