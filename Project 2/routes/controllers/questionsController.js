import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"
import { validasaur } from "../../deps.js";

/** Define the validation rules */
const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  questionText: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ request, response, render }) => {
  /** Get the required data */
  const body = request.body({ type: "form" });
  const params = await body.value;

  /** Construct the data to be validated */
  const questionData = {
    title: params.get("title"),
    questionText: params.get("question_text"),
  };

  /** Validate the data */
  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    questionData.validationErrors = errors
    questionData.currentUserQuestions = await questionService.getQuestionsByUserId(1)
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      1,
      questionData.title,
      questionData.questionText,
    );
    response.redirect("/questions");
  }
};

const showQuestionsPage = async ({ render }) => {
  render("questions.eta", {
      currentUserQuestions: await questionService.getQuestionsByUserId(1),
  })
}

const showQuestionPage = async ({ params, render }) => {
  const id = params.id
  const questionData = await questionService.getQuestionByQuestionID(id)
  questionData.details = await questionAnswerService.getAnswerByQuestionId(id)
  render("question.eta", questionData)
}

const deleteQuestion = async ({ params, response }) => {
  const id = params.id
  await questionService.deleteQuestion(id)
  response.redirect("/questions")
}

export { addQuestion, showQuestionsPage, showQuestionPage, deleteQuestion};
