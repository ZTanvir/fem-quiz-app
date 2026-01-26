import { Outlet } from "react-router";
import { useTheme } from "../context/ThemeContext";

const QuizLayout = () => {
  const { theme } = useTheme();
  return (
    <div
      data-theme={theme && theme}
      className="bg-brand-snow-white font-rubik dark:bg-brand-mystic-navy min-h-screen bg-[url(/src/assets/images/pattern-background-mobile-light.svg)] bg-contain bg-no-repeat md:bg-[url(/src/assets/images/pattern-background-tablet-light.svg)] md:bg-contain lg:bg-[url(/src/assets/images/pattern-background-desktop-light.svg)] lg:bg-cover dark:bg-[url(/src/assets/images/pattern-background-mobile-dark.svg)] md:dark:bg-[url(/src/assets/images/pattern-background-tablet-dark.svg)] lg:dark:bg-[url(/src/assets/images/pattern-background-desktop-dark.svg)]"
    >
      <div className="mx-auto max-w-7xl px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
};
export default QuizLayout;
