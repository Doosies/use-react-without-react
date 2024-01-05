import { render } from "./render";

type SetStateFunction<T> = (newState: T) => T;
type SetState<T> = (newState: T | SetStateFunction<T>) => void;

function isSetStateFunction<T>(
  value: T | SetStateFunction<T>
): value is SetStateFunction<T> {
  return typeof value === "function";
}

const state: unknown[] = [];
let stateIdx = 0;

export function useState<T>(initialState: T): [T, SetState<T>] {
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
    render();
  };

  // state, setState를 반환
  return [state[nowIdx] as T, setState as SetState<T>];
}

export function resetStateIdx() {
  stateIdx = 0;
}
