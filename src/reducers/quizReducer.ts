type QuizActionType =
  | { type: "checkQuiz"; quizType: string }
  | { type: "score"; quizType: string };

const quizInitialState = { quizType: "idle" };

const quizReducer = (
  state: typeof quizInitialState,
  action: QuizActionType,
) => {
  console.log(state, action.type);
  switch (action.type) {
    case "checkQuiz":
      return {
        quizType: "checkQuiz",
      };
    case "score":
      return {
        quizType: "score",
      };

    default:
      throw new Error("Unknown action type");
  }
};

export { quizReducer, quizInitialState };
