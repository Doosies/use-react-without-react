import React from "@React";
import App from "@src/App";
import { resetStateIdx } from "./useState";
import { resetEffectIdx, runSideEffects } from "./useEffect";

export function render() {
  resetStateIdx();
  resetEffectIdx();

  // 리렌더링
  const root = document.querySelector("#root");
  const dom = React.createDOM(<App />);
  root?.replaceChildren(dom);

  // useEffect를 통해 등록된 함수들을 실행
  runSideEffects();
}
