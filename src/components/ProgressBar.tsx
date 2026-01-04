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
      className="bg-brand-snow-white dark:bg-brand-stone-blue grid w-full rounded-sm border border-transparent p-1 shadow-sm"
    >
      <div
        style={{ gridColumn: `${1}/${updatedCurrentQuizNumber}` }}
        className="bg-brand-purple h-2 rounded-sm transition duration-1000"
      ></div>
    </div>
  );
};
export default ProgressBar;
