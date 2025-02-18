import { createContext, useState } from "react";

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
  const [Counter, setCounter] = useState(1);

  function changeCounter() {
    console.log("jjj");

    setCounter(Math.random());
  }

  return (
    <CounterContext.Provider value={{ Counter, changeCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
