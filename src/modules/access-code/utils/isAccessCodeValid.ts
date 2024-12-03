export const isAccessCodeValid = (codeArray: number[]): boolean => {
  const allSame = codeArray.every(digit => digit === codeArray[0])

  const isAscending = codeArray.every((digit, i) =>
    i === 0 ? true : digit === codeArray[i - 1] + 1,
  )
  const isDescending = codeArray.every((digit, i) =>
    i === 0 ? true : digit === codeArray[i - 1] - 1,
  )

  return !(isAscending || isDescending || allSame)
}
