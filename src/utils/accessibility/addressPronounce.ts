export const addressPronounce = (street: string) => {
  // Output: Herengracht 412A, 3 hoog
  if (/ (\d{1,})([a-zA-Z])-(\d)/.test(street)) {
    return street.replace(/ (\d{1,})([a-zA-Z])-(\d)/, ' $1 $2, $3 hoog')
  }

  // Output: Herengracht 3, 2 hoog
  if (/ (\d)-(\d)/.test(street)) {
    return street.replace(/ (\d)-(\d)/, ' $1, $2 hoog')
  }

  // Output: Herengracht 3 H
  if (/ (\d)-([a-zA-Z])/.test(street)) {
    return street.replace(/ (\d)-([a-zA-Z])/, ' $1 $2')
  }

  // Output: Herengracht 3 H
  if (/ (\d{1,})([a-zA-Z])/.test(street)) {
    return street.replace(/ (\d{1,})([a-zA-Z])/, ' $1 $2')
  }

  return street
}
