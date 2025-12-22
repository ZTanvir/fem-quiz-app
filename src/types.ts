import type { Dispatch, SetStateAction } from "react";

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

export type Theme = "light" | "dark";

export type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: Dispatch<SetStateAction<"light" | "dark">>;
};
