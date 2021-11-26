import * as questionService from "../../services/questionService.js";
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
    questionData.validationErrors = errors;
    render("question.eta", questionData);
  } else {
    await questionService.addQuestion(
      1,
      questionData.title,
      questionData.questionText,
    );
    response.redirect("/questions");
  }
};

export { addQuestion };
