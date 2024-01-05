export interface Ref<T> {
  current: T;
}

const refs: any[] = [];
let refIdx = 0;

export function useRef<T>(ref: T | null): Ref<T> {
  if (refs.length === refIdx) {
    refs.push({ current: ref });
  }

  return refs[refIdx++];
}

export function resetRefIdx() {
  refIdx = 0;
}
