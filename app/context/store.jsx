"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { useTheme } from "next-themes";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("top");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
    <GlobalContext.Provider
      value={{
        open,
        setOpen,
        isOpen,
        toggleNav,
        isModalOpen,
        toggleModal,
        theme,
        handleTheme,
        filter,
        setFilter,
        search,
        setSearch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
