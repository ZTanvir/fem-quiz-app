import useSWR from "swr";
import type { Quiz } from "../../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const Homepage = () => {
  const { data, error, isLoading } = useSWR<Quiz>(
    "http://localhost:3000/quizzes",
    fetcher,
  );

  if (error) return <p>Error on getting quiz data.Try again</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <section>
        <h1 className="flex flex-col text-4xl font-light">
          Welcome to the{" "}
          <span className="text-brand-mystic-navy font-bold">
            Frontend Quiz!
          </span>
        </h1>
        <p className="text-brand-gray-navy mt-4">
          Pick a subject to get started.
        </p>
      </section>
      <div className="space-y-4">
        {data &&
          data.map((quiz) => (
            <div
              className="flex cursor-pointer flex-wrap items-center gap-2 rounded-xl p-2 shadow-sm"
              key={quiz.id}
            >
              <img
                className="h-6 w-6"
                src={`src/${quiz.icon}`}
                alt={`${quiz.title} icon`}
              />
              {quiz.title}
            </div>
          ))}
      </div>
    </div>
  );
};
export default Homepage;
