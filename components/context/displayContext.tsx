import React, { createContext, useContext, useState } from "react";

type DisplayWrapperProps = {
  children: React.ReactNode;
};

const DisplayStyleContext = createContext("");

export default function DisplayContext({ children }: DisplayWrapperProps) {
  const [displaystyle, updateDisplayStyle] = useState("List");
  const value = {
    displayStyle: displaystyle,
  };

  function toggleTheme() {
    updateDisplayStyle((prevState) => (prevState == "List" ? "Grid" : "List"));
  }

  return (
    <DisplayStyleContext.Provider value={displaystyle}>
      <button style={{ margin: "10px 10px 10px 10px" }} onClick={toggleTheme}>
        {displaystyle === "List" ? "Grid" : "List"}
      </button>
      {children}
    </DisplayStyleContext.Provider>
  );
}

export { DisplayContext, DisplayStyleContext };
