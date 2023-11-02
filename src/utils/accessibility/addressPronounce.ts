export const addressPronounce = (street: string) =>
  street
    .replace(/( |^)(\d+[a-zA-Z]?)-(\d+)/, '$1$2, $3 hoog')
    .replace(/( |^)(\d+)-?([a-zA-Z])/, '$1$2-$3')
