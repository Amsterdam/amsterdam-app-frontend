export const getWaitingTimePhrase = (waitingTime: number) =>
  waitingTime <= 60
    ? 'minder dan een minuut'
    : `${Math.ceil(waitingTime / 60)} minuten`
