import { validasaur } from "../../deps.js";
import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"

const answerValidationRules = {
    optionText: [validasaur.required, validasaur.minLength(1)],
}

const addAnswerOptions = async ({ request, response, render, params }) => {
    /** Get the required data */
    const id = params.id
    const body = request.body({ type: "form" });
    const data = await body.value;

    /** Construct the data to be validated */
    const answerOptionData = {
        optionText: data.get("option_text"),
        isCorrect: data.get("is_correct"),
    }

    /** Validate the data */
    const [passes, errors] = await validasaur.validate(
        answerOptionData,
        answerValidationRules,
    )

    /** Get the data of the question */
    const questionData = await questionService.getQuestionByQuestionID(id)

    if (!passes) {
        /** Prepare all the data needed to render the question.eta */
        questionData.validationErrors = errors
        questionData.optionText = addAnswerOptions.optionText
        questionData.details = await questionAnswerService.getAnswerByQuestionId(id)
        render("question.eta", questionData);
    } else {
        /** Add the sent data to the data base question_answer_options */
        const isCorrect = (answerOptionData.isCorrect === "on") ? true : false
        await questionAnswerService.addAnswerOptions(id, answerOptionData.optionText, isCorrect)
        response.redirect(`/questions/${id}`)
    }
}

const deleteAnswerOption = async ({ response, params }) => {
    const questionID = params.questionId
    const optionId = params.optionId
    await questionAnswerService.deleteAnswerOption(questionID, optionId)

    response.redirect(`/questions/${questionID}`)
}

export { addAnswerOptions, deleteAnswerOption }