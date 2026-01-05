import { useLocation } from "react-router";
import type { QuizCategory } from "../../types";
import { Link } from "react-router";
import ToggleTheme from "../../components/ToggleTheme";

const Index = () => {
  const location = useLocation();
  const { score, quizData }: { score: number; quizData: QuizCategory } =
    location.state || {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`../src/${quizData?.icon}`}
            className="w-7"
            alt="quiz topic"
          />
          <span className="text-brand-mystic-navy dark:text-brand-snow-white font-semibold">
            {quizData?.title}
          </span>
        </div>
        <ToggleTheme />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <h1 className="text-brand-mystic-navy dark:text-brand-snow-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            Quiz completed
          </h1>
          <p className="text-brand-mystic-navy dark:text-brand-snow-white text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            You scored...
          </p>
        </div>

        <div>
          <div className="dark:bg-brand-stone-blue flex flex-col items-center justify-evenly gap-2 rounded-2xl bg-white p-4">
            <div className="flex items-center gap-2">
              <img
                src={`../src/${quizData.icon}`}
                className="w-7"
                alt="quiz topic"
              />
              <span className="text-brand-mystic-navy dark:text-brand-snow-white font-semibold">
                {quizData?.title}
              </span>
            </div>
            <h2 className="dark:text-brand-snow-white text-brand-mystic-navy text-8xl">
              {score}
            </h2>
            <p className="dark:text-brand-snow-white text-brand-mystic-navy text-sm font-light">
              out of {quizData.questions.length}
            </p>
          </div>
          <div>
            <Link
              className="bg-brand-purple hover:bg-brand-purple/30 mt-4 flex w-full items-center justify-center rounded-xl py-2 text-white duration-300 hover:cursor-pointer"
              to={"/"}
            >
              Play again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
