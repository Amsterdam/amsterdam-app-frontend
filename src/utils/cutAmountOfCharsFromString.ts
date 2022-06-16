type Params = {
  amount: number
  position: 'start' | 'end'
  text: string
}
export const cutAmountOfCharsFromString = ({
  amount,
  position = 'start',
  text,
}: Params) => {
  if (position === 'start') {
    return text.slice(0, amount)
  }
  if (position === 'end') {
    return text.slice(0, -amount)
  }
}
