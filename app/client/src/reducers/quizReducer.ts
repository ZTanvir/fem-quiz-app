type QuizActionType =
  | { type: "idle" }
  | { type: "checkQuiz" }
  | { type: "score" };
type QuizState = "idle" | "checkQuiz" | "score";

const quizInitialState = "idle";

const quizReducer = (state: QuizState, action: QuizActionType): QuizState => {
  switch (action.type) {
    case "idle":
      return "idle";

    case "checkQuiz":
      return "checkQuiz";

    case "score":
      return "score";

    default:
      throw state;
  }
};

export { quizReducer, quizInitialState };
