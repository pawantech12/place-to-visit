"use client";
import { createContext, useState } from "react";

// Create the context
const Context = createContext();

// Create a provider component
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export default Context;
