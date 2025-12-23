import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import QuizLayout from "./layout/QuizLayout.tsx";
import { ThemeContextProvider } from "./context/ThemeContext.tsx";
import App from "./App.tsx";
import Quiz from "./pages/Quiz/Quiz.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<QuizLayout />}>
            <Route index element={<App />} />
            <Route path="/quiz" element={<Quiz />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  </StrictMode>,
);
