import useSWR from "swr";
import type { Quiz } from "../../types";
import ToggleTheme from "../../components/ToggleTheme";
import { Link } from "react-router";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Homepage = () => {
  const { data, error, isLoading } = useSWR<Quiz>(
    "http://localhost:3000/quizzes",
    fetcher,
  );

  if (error) return <p>Error on getting quiz data.Try again</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex justify-end">
        <ToggleTheme />
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <section>
          <h1 className="dark:text-brand-snow-white flex flex-col text-6xl font-light">
            Welcome to the
            <span className="text-brand-mystic-navy dark:text-brand-snow-white font-bold">
              Frontend Quiz!
            </span>
          </h1>
          <p className="text-brand-gray-navy dark:text-brand-ozone mt-4 text-xl italic">
            Pick a subject to get started.
          </p>
        </section>
        <div className="space-y-4">
          {data &&
            data.map((quiz) => (
              <Link key={quiz.id} className="block" to="/quiz">
                <div className="dark:bg-brand-stone-blue dark:text-brand-snow-white flex cursor-pointer flex-wrap items-center gap-2 rounded-xl px-2 py-4 shadow-sm">
                  <img
                    className="h-6 w-6 object-contain"
                    src={`src/${quiz.icon}`}
                    alt={`${quiz.title} icon`}
                  />
                  {quiz.title}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Homepage;
