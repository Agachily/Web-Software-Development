import { Router } from "../deps.js";
import * as questionsController from "./controllers/questionsController.js";
import * as questionAnswerController from "./controllers/questionAnswerController.js";

const router = new Router();

router
    .get("/questions", questionsController.showQuestionsPage)
    .post("/questions", questionsController.addQuestion)
    .get("/questions/:id", questionsController.showQuestionPage)
    .post("/questions/:id/options", questionAnswerController.addAnswerOptions)

export { router };
