import React, { useEffect, useState } from "@React";
import { useRef } from "@core/useRef";

function Counter1() {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter((prev) => prev + 1);

  return (
    <div>
      <div>counter1: {counter}</div>
      <button onclick={increment}>증가버튼1</button>
    </div>
  );
}
function Counter2() {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter((prev) => prev + 1);

  return (
    <div>
      <div>counter2: {counter}</div>
      <button onclick={increment}>증가버튼2</button>
    </div>
  );
}
function App() {
  const divRef = useRef<HTMLDivElement>(null);

  const changeColor = () => {
    divRef.current.style.backgroundColor = "blue";
  };

  return (
    <div ref={divRef} style="padding: 10px; background-color: red;">
      <button onclick={changeColor}>색상을 바꾸는 버튼!</button>
    </div>
  );
}

export default App;
