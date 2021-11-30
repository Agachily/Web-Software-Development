import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"

const getRandomQuestion = async({response}) => {
    const randomQuestion = await questionService.getRandomQuestion()
    if (randomQuestion !== null){
        const questionId = randomQuestion.id
        const optionsData = await questionAnswerService.getAnswerByQuestionId(questionId)

        /** Process the options data */
        for (let i = 0; i < optionsData.length; i++) {
            delete optionsData[i].question_id
            delete optionsData[i].is_correct
            const id = optionsData[i].id
            const text = optionsData[i].option_text
            delete optionsData[i].id
            delete optionsData[i].option_text
            optionsData[i].optionId = id
            optionsData[i].optionText = text
        }

        /** Construct the sent data */
        const data = {
            questionId : randomQuestion.id,
            questionTitle : randomQuestion.title,
            questionText : randomQuestion.question_text,
            answerOptions : optionsData,
        }
        response.body = data
    } else {
        response.body = {}
    }
}

const processAnswer = async ({request, response}) => {
    /** Process the posted data */
    const body = request.body()
    const content = await body.value

    const questionId = content.questionId
    const optionId = content.optionId

    /** Get the id of correct option text */
    const corretOptionId = []
    const res = await questionAnswerService.getCorrectOption(questionId)

    if(res.length > 0){
        for(let i = 0; i<res.length; i++){
            corretOptionId.push(res[i].id)
        }
    
        const isCorrect = corretOptionId.includes(Number(optionId))
    
        const responseData = {
            correct : isCorrect,
        }
    
        response.body = responseData
    } else {
        response.body = {}
    }
}

export {getRandomQuestion, processAnswer}