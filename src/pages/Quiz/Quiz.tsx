import { useLocation } from "react-router";
import { useReducer, useState } from "react";
import { Link } from "react-router";
import type { QuizCategory } from "../../types";
import { quizReducer, quizInitialState } from "../../reducers/quizReducer";
import ToggleTheme from "../../components/ToggleTheme";
import iconError from "../../assets/images/icon-error.svg";
import iconCorrect from "../../assets/images/icon-correct.svg";

const Quiz = () => {
  const location = useLocation();
  const { quizData }: { quizData: QuizCategory } = location.state || {};
  const [quizQuestions] = useState<QuizCategory["questions"]>(
    quizData.questions,
  );
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizState, quizDispatch] = useReducer(quizReducer, quizInitialState);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);

  const quizOptions = quizQuestions[currentQuizIndex].options;

  // check for valid answer in checkQuiz and score state
  const isAnswerValid =
    (quizState === "checkQuiz" || quizState === "score") &&
    selectedAnswer === quizQuestions[currentQuizIndex]?.answer;

  const handleCheckQuizBtn = () => {
    if (quizState === "idle" && !selectedAnswer) {
      setErrorMessage(true);
    } else if (quizState === "idle" && selectedAnswer) {
      const isLastQuestion = quizQuestions.length - 1;
      if (currentQuizIndex === isLastQuestion) {
        // render redirect to score page button
        quizDispatch({ type: "score" });
        setErrorMessage(false);
      } else {
        // render check quiz button
        quizDispatch({ type: "checkQuiz" });
        setErrorMessage(false);
      }
    }
  };

  const handleNextQuizBtn = () => {
    //  check answer is correct
    if (isAnswerValid) {
      setScore(score + 1);
    }
    // check if the question are end
    if (currentQuizIndex < quizQuestions.length) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      quizDispatch({ type: "idle" });
    }
  };

  // render button based on quiz state
  function quizButton(quizState: string) {
    switch (quizState) {
      case "idle":
        return (
          <button
            onClick={handleCheckQuizBtn}
            className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
          >
            Submit Answer
          </button>
        );

      case "checkQuiz":
        return (
          <button
            onClick={handleNextQuizBtn}
            className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
          >
            Next Question
          </button>
        );

      case "score":
        return (
          <Link
            className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
            state={score}
            to={"/quiz/result"}
          >
            Result
          </Link>
        );

      default:
        return "Submit Answer";
    }
  }

  // return border color based on state and option quiz answer option match
  const getBorderColorClass = (option: string) => {
    if (quizState === "idle") {
      if (selectedAnswer === option) {
        return "border-brand-purple dark:border-brand-purple";
      }
      return "dark:border-brand-stone-blue border-gray-100/10";
    }
    // for checkQuiz and score state
    if (isAnswerValid && selectedAnswer === option) {
      //  valid answer
      return "border-brand-vivid-mint";
    } else if (!isAnswerValid && selectedAnswer === option) {
      // invalid answer
      return "border-brand-red-aura";
    }
    return "dark:border-brand-stone-blue border-gray-100/10";
  };

  // return quiz icon based on quiz state and correct answer that match with selected answer with option
  const getCheckQuizIcon = (option: string) => {
    if (quizState !== "idle") {
      // check is the answer is correct
      if (isAnswerValid) {
        if (selectedAnswer === option) {
          return <img className="w-7" src={iconCorrect} alt="Correct symbol" />;
        }
      } else {
        // check is the answer is incorrect
        if (selectedAnswer === option) {
          return <img className="w-7" src={iconError} alt="Error symbol" />;
          // check does the answer match with this option
        } else if (quizQuestions[currentQuizIndex].answer === option) {
          return <img className="w-7" src={iconCorrect} alt="Correct symbol" />;
        }
      }
    }
  };
  // return option serial text bg hover color based on quiz state , correct or incorrect answer
  const getOptionSerialBgClass = (option: string) => {
    if (quizState === "idle") {
      if (selectedAnswer === option) {
        return "group-hover:bg-brand-purple group-hover:text-brand-snow-white";
      } else {
        return "group-hover:bg-purple-300";
      }
    }
  };

  // return option serial text bg color based on quiz state ,correct or incorrect answer
  const getOptionSerialHoverBgClass = (option: string) => {
    if (quizState === "idle") {
      return "bg-brand-snow-white";
    }

    // for checkQuiz and score state
    if (isAnswerValid && selectedAnswer === option) {
      //  valid answer
      return "bg-brand-vivid-mint";
    } else if (!isAnswerValid && selectedAnswer === option) {
      // invalid answer
      return "bg-brand-red-aura";
    }
    return "bg-brand-snow-white";
  };

  // return text bg color based on quiz state , correct or incorrect answer
  const getOptionSerialTextColorClass = (option: string) => {
    if (quizState === "idle") {
      return "text-brand-gray-navy";
    }

    // for checkQuiz and score state
    if (isAnswerValid && selectedAnswer === option) {
      //  valid answer
      return "text-brand-snow-white";
    } else if (!isAnswerValid && selectedAnswer === option) {
      // invalid answer
      return "text-brand-snow-white";
    }
    return "text-brand-gray-navy";
  };

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
          <p className="font-light text-gray-600 italic">
            Question {currentQuizIndex + 1} of {quizQuestions.length}
          </p>
          <h1 className="text-brand-mystic-navy text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            {quizQuestions[currentQuizIndex]?.question}
          </h1>
          <div></div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            {quizOptions.map((option, index) => (
              <div
                onClick={() => {
                  if (quizState === "idle") {
                    setSelectedAnswer(option);
                  }
                }}
                className={`dark:bg-brand-stone-blue group rounded-xl border-2 bg-white p-2 shadow-sm transition duration-300 hover:cursor-pointer dark:text-white ${getBorderColorClass(option)}`}
                key={index}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-4">
                    <span
                      className={`rounded-md px-3 py-2 transition duration-500 ${getOptionSerialTextColorClass(option)} ${getOptionSerialHoverBgClass(option)} ${getOptionSerialBgClass(option)}`}
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                  {getCheckQuizIcon(option)}
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
