import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js"
import { validasaur } from "../../deps.js";

/** Define the validation rules */
const questionValidationRules = {
  title: [validasaur.required, validasaur.minLength(1)],
  questionText: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ request, response, render, state }) => {
  /** Get current user id */
  const userId = (await state.session.get("user")).id
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
    questionData.currentUserQuestions = await questionService.getQuestionsByUserId(userId)
    render("questions.eta", questionData);
  } else {
    await questionService.addQuestion(
      userId,
      questionData.title,
      questionData.questionText,
    );
    response.redirect("/questions");
  }
};

const showQuestionsPage = async ({ render, state }) => {
  /** Get current user id */
  const userId = (await state.session.get("user")).id

  render("questions.eta", {
      currentUserQuestions: await questionService.getQuestionsByUserId(userId),
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

const getRandomQuestion = async ({response}) => {
  const randomQuestion = await questionService.getRandomQuestion()
  if(randomQuestion !== null) {
    const questionId = randomQuestion.id
    response.redirect(`/quiz/${questionId}`)
  } else {
    response.body = "There is no questions"
  }
}

const showQuiz = async ({params, render}) => {
  const questionId = params.id
  const questionData = await questionService.getQuestionByQuestionID(questionId)
  const quizData = {
    id: questionData.id,
    title: questionData.title,
    text: questionData.question_text,
    options: await questionAnswerService.getAnswerByQuestionId(questionId)
  }
  render("quiz.eta", quizData)
}

const processPostAnswer = async ({params, response}) => {
  const questionId = params.id
  const optionId = params.optionId

  /** Get the id of correct option text */
  const corretOptionId = []
  const res = await questionAnswerService.getCorrectOption(questionId)
  for(let i = 0; i<res.length; i++){
    corretOptionId.push(res[i].id)
  }

  /** Judge whether the user post the correct answer */
  if ( corretOptionId.includes(Number(optionId))) {
    response.redirect(`/quiz/${questionId}/correct`)
  } else {
    response.redirect(`/quiz/${questionId}/incorrect`)
  }
}

const showCorrectPage = ({render}) => {
  render("correct.eta")
}

const showIncorrectPage = async ({render, params}) => {
  const questionId = params.id
  const correctOptions = {
    data: [],
  }
  /** Get all the correct options */
  const res = await questionAnswerService.getCorrectOption(questionId)
  for(let i = 0; i<res.length; i++){
    correctOptions.data.push(res[i].option_text)
  }
  render("incorrect.eta", correctOptions)
}

export { 
  addQuestion, 
  showQuestionsPage, 
  showQuestionPage, 
  deleteQuestion, 
  getRandomQuestion, 
  showQuiz, 
  processPostAnswer,
  showCorrectPage,
  showIncorrectPage,
};
