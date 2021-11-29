import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"

const getRandomQuestion = async({response}) => {
    const randomQuestion = await questionService.getRandomQuestion()
    const questionId = randomQuestion.id
    const optionsData = await questionAnswerService.getAnswerByQuestionId(questionId)

    /** Process the options data */
    for (let i = 0; i < optionsData.length; i++) {
        delete optionsData[i].question_id
        delete optionsData[i].is_correct
    }

    /** Construct the sent data */
    const data = {
        questionId : randomQuestion.id,
        questionTitle : randomQuestion.title,
        questionText : randomQuestion.question_text,
        answerOptions : optionsData,
    }

    response.body = data
}

export {getRandomQuestion}