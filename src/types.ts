export interface Question {
  question: string;
  options: [];
  answer: string;
}

export interface QuizCategory {
  id: string;
  title: "HTML" | "CSS" | "JavaScript" | "Accessibility" | string;
  icon: string;
  questions: Question[];
}

export type Quiz = QuizCategory[];
