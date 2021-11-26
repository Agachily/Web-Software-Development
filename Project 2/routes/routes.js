import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsController from "./controllers/questionsController.js";

const router = new Router();

router
    .get("/questions", mainController.showMain)
    .post("/questions", questionsController.addQuestion)

export { router };
