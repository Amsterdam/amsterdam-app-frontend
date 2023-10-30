export const addressPronounce = (street: string) => {
  if (/ (\d{1,})([a-zA-Z]) /.test(street)) {
    // [street] [number][alphanummeric]
    return street.replace(/ (\d{1,})([a-zA-Z]) /, ' $1, $2')
  }

  if (/ (\d{1,})([a-zA-Z])-(\d)/.test(street)) {
    // [street] [number][alphanummeric]-[number]
    return street.replace(/ (\d{1,})([a-zA-Z])-(\d)/, ' $1 $2, $3 hoog')
  }

  if (/ (\d)-([a-zA-Z])/.test(street)) {
    // [street] [number]-[alphanummeric]
    return street.replace(/ (\d)-([a-zA-Z])/, ' $1 $2')
  }

  if (/ (\d)-(\d)/.test(street)) {
    // [street] [number]-[number]
    return street.replace(/ (\d)-(\d)/, ' $1, $2 hoog')
  }

  return street
}
