import { useLocation } from "react-router";
import { useReducer, useState } from "react";
import type { QuizCategory } from "../../types";
import { quizReducer, quizInitialState } from "../../reducers/quizReducer";
import ToggleTheme from "../../components/ToggleTheme";

const Quiz = () => {
  const location = useLocation();
  const { quizData }: { quizData: QuizCategory } = location.state || {};
  const [quizQuestions, setQuizQuestions] = useState(quizData.questions);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizState, quizDispatch] = useReducer(quizReducer, quizInitialState);

  const quizOptions = quizQuestions[currentQuizIndex].options;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={`src/${quizData.icon}`} alt="" />
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
                className="dark:bg-brand-stone-blue group dark:border-brand-stone-blue rounded-xl border border-gray-200 bg-white p-2 shadow-lg hover:cursor-pointer dark:text-white"
                key={index}
              >
                <div className="flex items-center gap-4">
                  <span className="bg-brand-snow-white text-brand-gray-navy group-hover:text-brand-purple rounded-md px-3 py-2 transition duration-500 group-hover:bg-purple-300">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </div>
            ))}
          </div>

          <button className="bg-brand-purple hover:bg-brand-purple/30 mt-4 w-full justify-center rounded-xl px-3 py-2 text-white duration-300 hover:cursor-pointer">
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};
export default Quiz;
