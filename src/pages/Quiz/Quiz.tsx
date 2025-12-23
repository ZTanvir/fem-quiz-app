import { useLocation } from "react-router";
const Quiz = () => {
  const location = useLocation();
  const { quizData } = location.state || {};
  console.log(quizData);
  return <h1>{}</h1>;
};
export default Quiz;
