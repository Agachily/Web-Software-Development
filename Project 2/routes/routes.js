import { Router } from "../deps.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAnswerController from "./controllers/questionAnswerController.js";
import * as userController from "./controllers/userController.js";

const router = new Router();

router
    .get("/questions", questionsController.showQuestionsPage)
    .post("/questions", questionsController.addQuestion)
    .get("/questions/:id", questionsController.showQuestionPage)
    .post("/questions/:id/delete", questionsController.deleteQuestion)
    .post("/questions/:id/options", questionAnswerController.addAnswerOptions)
    .post("/questions/:questionId/options/:optionId/delete", questionAnswerController.deleteAnswerOption)
    .get("/auth/register", userController.showRegisterForm)
    .post("/auth/register", userController.addUser)
    .get("/auth/login", userController.showLoginForm)
    .post("/auth/login", userController.processLogin)

export { router };
