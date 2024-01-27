"use client";
import { createContext, useState } from "react";

const ThemeContext = createContext();

export const Theme = ThemeContext;

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
