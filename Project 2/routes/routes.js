import { Router } from "../deps.js";
import * as questionsController from "./controllers/questionsController.js";

const router = new Router();

router
    .get("/questions", questionsController.showQuestionsPage)
    .post("/questions", questionsController.addQuestion)

export { router };
