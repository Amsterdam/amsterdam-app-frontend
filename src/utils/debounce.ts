export function debounce<T extends unknown[]>(
  fn: (...a: T) => unknown,
  ms: number,
) {
  let timeoutID: NodeJS.Timeout | null = null

  return (...args: T) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }

    timeoutID = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fn.apply(this, args)
    }, ms)
  }
}
