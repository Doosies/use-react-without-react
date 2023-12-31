import App from "@src/App";
import React from ".";

type SetStateFunction<T> = (newState: T) => T;
type SetState<T> = (newState: T | SetStateFunction<T>) => void;

function isSetStateFunction<T>(
  value: T | SetStateFunction<T>
): value is SetStateFunction<T> {
  return typeof value === "function";
}

const state: unknown[] = [];
let stateIdx = 0;

function useState<T>(initialState: T): [T, SetState<T>] {
  let nowIdx = stateIdx++;

  // 만약 초기화를 진행한적이 없다면 초기화
  if (state.length === nowIdx) {
    state.push(initialState);
  }

  const setState = (newState: T | SetStateFunction<T>) => {
    // 상태를 변경
    if (isSetStateFunction(newState)) {
      state[nowIdx] = newState(state[nowIdx] as T);
    } else {
      state[nowIdx] = newState;
    }

    // 다음에 리렌더링 될 때 올바른 상태를 가리키도록 인덱스를 초기화
    stateIdx = 0;
    // 리렌더링
    const root = document.querySelector("#root");
    const dom = React.createDOM(<App />);
    root?.replaceChildren(dom);
  };

  // state, setState를 반환
  return [state[nowIdx] as T, setState as SetState<T>];
}

export default useState;
