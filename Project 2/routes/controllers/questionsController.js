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

const processPostAnswer = async ({params, response, state}) => {
  const questionId = params.id
  const optionId = params.optionId
  const userId = (await state.session.get("user")).id

  /** Get the id of correct option text */
  const corretOptionId = []
  const res = await questionAnswerService.getCorrectOption(questionId)
  for(let i = 0; i<res.length; i++){
    corretOptionId.push(res[i].id)
  }

  /** Judge whether the answer is correct */
  const isCorrect = corretOptionId.includes(Number(optionId))

  /** Store the anserwered question to database */
  await questionAnswerService.storePostAnswer(userId, questionId, optionId, isCorrect)

  /** Judge whether the user post the correct answer */
  if (isCorrect) {
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

const showStatistics = async({state, render}) => {
  const userId = (await state.session.get("user")).id
  const res = await questionAnswerService.getUserAnswerByUserId(userId)

  const statData = {
    allAnswerNumber : 0,
    correctAnswer : 0,
    postedAnswerNumber : 0,
    user : [],
  }

  /** Get total number of the questions answered by the user */
  const allAnswerNumber = res.length
  statData.allAnswerNumber = allAnswerNumber

  /** The total number of correct answer */
  let correctAnswer = 0
  for (let i=0; i<allAnswerNumber; i++) {
    if (res[i].correct === true) {
      correctAnswer += 1
    }
  }
  statData.correctAnswer = correctAnswer

  /** The number of answers given to the question crated by the user  */
  const answerData = await questionAnswerService.answerToQuesOfUser(userId)
  statData.postedAnswerNumber = answerData.length

  /** Lists five users with the most answered questions */
  statData.user = await questionAnswerService.getFiveUser()

  /** render the page */
  render("statistics.eta", statData)
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
  showStatistics,
};
