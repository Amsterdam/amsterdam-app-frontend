import simplur from 'simplur'

export const replaceZero = (q: number) => (q === 0 ? 'geen' : q.toString())

export const getQueuedPhrase = (queued: number) =>
  simplur`Er ${[queued]} [is|zijn] nu ${[queued, replaceZero]} wachtende[|n]`

export const getWaitingTimePhrase = (waitingTime: number) =>
  'De wachttijd is ' +
  (waitingTime >= 60
    ? 'meer dan een uur'
    : simplur`${waitingTime} minu[ut|ten]`)
