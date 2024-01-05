const effects: { deps?: unknown[] }[] = [];
let effectsArrayAfterRender: { callback: () => void; isRuned?: boolean }[] = [];
let effectsIdx = 0;

export function runSideEffects(): void {
  effectsArrayAfterRender.forEach((effect) => {
    // 이미 실행된 effect라면 실행하지 않음
    if (effect?.isRuned) return;
    effect.isRuned = true;
    effect.callback();
  });

  effectsArrayAfterRender = [];
}

export function useEffect(callback: () => void, deps?: unknown[]) {
  // 이전 deps와 현재 deps가 다른지 비교하는 함수
  const isDifferentDeps = (dep: unknown, idx: number) => dep !== deps?.[idx];

  // 최초 실행시에만 effects에 넣어줌.
  if (effects.length === effectsIdx) {
    effects.push({ deps });
    effectsArrayAfterRender.push({ callback });
  }
  // deps를 넣지 않았거나 ||
  // 이전 effect와 비교했을 때 deps의 값중 하나라도 다르다면
  else if (!deps || effects[effectsIdx]?.deps?.some(isDifferentDeps)) {
    effects[effectsIdx] = { deps };
    effectsArrayAfterRender.push({ callback });
  }

  effectsIdx++;
}

export function resetEffectIdx() {
  effectsIdx = 0;
}
