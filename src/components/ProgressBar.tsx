type ProgressBarProps = {
  currentQuizNumber: number;
  totalQuestions: number;
};

const ProgressBar = ({
  currentQuizNumber,
  totalQuestions,
}: ProgressBarProps) => {
  // grid column start at position 1
  const updatedCurrentQuizNumber = currentQuizNumber + 2;
  const totalCol = `repeat(${totalQuestions},1fr)`;

  return (
    <div
      style={{ gridTemplateColumns: `${totalCol}` }}
      className="dark:bg-brand-stone-blue grid w-full rounded-lg border border-transparent bg-white p-1"
    >
      <div
        style={{ gridColumn: `${1}/${updatedCurrentQuizNumber}` }}
        className="bg-brand-purple h-1.5 rounded-lg transition duration-1000"
      ></div>
    </div>
  );
};
export default ProgressBar;
