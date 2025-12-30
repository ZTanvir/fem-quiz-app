import { useLocation } from "react-router";
import { useReducer, useState } from "react";
import { Link } from "react-router";
import type { QuizCategory } from "../../types";
import { quizReducer, quizInitialState } from "../../reducers/quizReducer";
import ToggleTheme from "../../components/ToggleTheme";
import iconError from "../../assets/images/icon-error.svg";
import iconCorrect from "../../assets/images/icon-incorrect.svg";

const Quiz = () => {
  const location = useLocation();
  const { quizData }: { quizData: QuizCategory } = location.state || {};
  const [quizQuestions, setQuizQuestions] = useState<QuizCategory["questions"]>(
    quizData.questions,
  );
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizState, quizDispatch] = useReducer(quizReducer, quizInitialState);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);

  const quizOptions = quizQuestions[currentQuizIndex].options;

  const handleQuizSubmitBtn = () => {
    if (!selectedAnswer) {
      setErrorMessage(true);
    } else {
      quizDispatch({ type: "score" });
      setErrorMessage(false);
    }
  };

  const handleCheckQuizBtn = () => {
    quizDispatch({ type: "checkQuiz" });
  };

  // render button based on quiz state
  function quizButton(quizState: string) {
    switch (quizState) {
      case "idle":
        return (
          <button
            onClick={handleQuizSubmitBtn}
            className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
          >
            Submit Answer
          </button>
        );

      case "checkQuiz":
        return (
          <button
            onClick={handleCheckQuizBtn}
            className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
          >
            Next Question
          </button>
        );

      case "score":
        return (
          <Link
            className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
            to={"/quiz/result"}
          >
            Next Question
          </Link>
        );

      default:
        return "Submit Answer";
    }
  }

  console.log(quizQuestions[0].answer);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={`src/${quizData.icon}`} alt="quiz topic" />
          <span className="text-brand-mystic-navy dark:text-brand-snow-white font-semibold">
            {quizData?.title}
          </span>
        </div>
        <ToggleTheme />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <p className="text-shadow-brand-gray-navy font-light italic">
            Question {currentQuizIndex + 1} of {quizQuestions.length}
          </p>
          <p>{quizQuestions[currentQuizIndex].question}</p>
          <div></div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {quizOptions.map((option, index) => (
              <div
                onClick={() => setSelectedAnswer(option)}
                className={`dark:bg-brand-stone-blue group rounded-xl border-2 bg-white p-2 shadow-sm hover:cursor-pointer dark:text-white ${quizState === "idle" && selectedAnswer === option ? "border-brand-purple dark:border-brand-purple" : "dark:border-brand-stone-blue border-gray-100/10"} `}
                key={index}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className={`bg-brand-snow-white text-brand-gray-navy rounded-md px-3 py-2 transition duration-500 ${selectedAnswer === option ? "group-hover:bg-brand-purple group-hover:text-brand-snow-white" : "group-hover:bg-purple-300"}`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                  {(quizState === "checkQuiz" || quizState === "score") && (
                    <img
                      className="w-7"
                      src={iconCorrect}
                      alt="Correct symbol"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <>{quizButton(quizState)}</>
          <>
            {quizState === "idle" && errorMessage && (
              <div className="mt-4 flex items-center justify-center gap-1">
                <img src={iconError} className="w-7" alt="Error symbol" />
                <span className="text-brand-red-aura">
                  Please select an answer
                </span>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
