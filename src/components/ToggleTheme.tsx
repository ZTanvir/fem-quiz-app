import iconLightSun from "../assets/images/icon-sun-light.svg";
import iconDarkSun from "../assets/images/icon-sun-dark.svg";
import iconLightMoon from "../assets/images/icon-moon-light.svg";
import iconDarkMoon from "../assets/images/icon-moon-dark.svg";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState<boolean>(() => {
    const checkLocalStorage = localStorage.getItem("quizAppDarkTheme");
    if (!checkLocalStorage) {
      localStorage.setItem("quizAppDarkTheme", JSON.stringify(false));
      return false;
    }
    const localStorageValue: boolean = JSON.parse(checkLocalStorage);

    return localStorageValue;
  });

  useEffect(() => {
    setTheme(isDark ? "dark" : "light");
    localStorage.setItem("quizAppDarkTheme", JSON.stringify(isDark));
  }, [isDark]);

  return (
    <div>
      <label className="flex gap-0.5">
        {isDark ? (
          <img src={iconLightMoon} alt="dark moon" />
        ) : (
          <img src={iconDarkMoon} alt="light moon" />
        )}
        <input
          onChange={() => setIsDark(!isDark)}
          className="bg-brand-purple relative h-8 w-15 appearance-none rounded-2xl outline-none after:absolute after:top-[50%] after:left-[25%] after:h-6 after:w-6 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-white after:transition-[left] after:duration-300 after:content-[''] checked:after:left-[75%] hover:cursor-pointer"
          type="checkbox"
          name="toggle"
          id="toggle"
          checked={isDark}
        />
        {isDark ? (
          <img src={iconLightSun} alt="dark sun" />
        ) : (
          <img src={iconDarkSun} alt="light sun" />
        )}
      </label>
    </div>
  );
};
export default ToggleTheme;
