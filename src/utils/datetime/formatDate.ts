export const formatDate = (date: string | number) => {
  const jsDate = new Date(date)

  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(jsDate)

  return formattedDate
}
