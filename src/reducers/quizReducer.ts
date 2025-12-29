type QuizActionType = { type: "checkQuiz" } | { type: "score" };
type QuizState = "idle" | "checkQuiz" | "score";

const quizInitialState = "idle";

const quizReducer = (state: QuizState, action: QuizActionType): QuizState => {
  console.log(state, action.type);
  switch (action.type) {
    case "checkQuiz":
      return "checkQuiz";

    case "score":
      return "score";

    default:
      throw state;
  }
};

export { quizReducer, quizInitialState };
