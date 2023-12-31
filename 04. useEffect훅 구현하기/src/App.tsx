import React from "@React";
import useState from "../lib/React/useState";

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
  const [isCounter1Show, setIsCounter1Show] = useState(true);
  const toggleCounter = () => setIsCounter1Show((prev) => !prev);

  return (
    <div>
      <button onclick={toggleCounter}>카운터 토글</button>
      {isCounter1Show ? <Counter1 /> : <Counter2 />}
    </div>
  );
}

export default App;
