import React, { useEffect, useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <GlobalContext.Provider value={{ isOpen, toggleNav }}>
      {children}
    </GlobalContext.Provider>
  );
};
