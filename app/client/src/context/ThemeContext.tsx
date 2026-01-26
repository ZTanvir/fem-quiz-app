import { useState } from "react";
import { createContext, useContext } from "react";
import type { ThemeContextType, Theme } from "../types";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme must be used within a ThemeContextProvider");
  }
  return themeContext;
};
