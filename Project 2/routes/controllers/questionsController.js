import * as questionService from "../../services/questionService.js";

const addQuestion = async ({request, response}) => {
    /** Get the required data */
    const body = request.body({ type: "form" })
    const params = await body.value
    const title = params.get("title")
    const questionText = params.get("question_text")

    await questionService.addQuestion(1, title, questionText)

    response.redirect("/questions")
}

export { addQuestion }
