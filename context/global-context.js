import React, { useEffect, useState, createContext } from "react";
import { useTheme } from "next-themes";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTheme = (e) => {
    if (!mounted) return null;

    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <GlobalContext.Provider value={{ isOpen, toggleNav, theme, handleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};
