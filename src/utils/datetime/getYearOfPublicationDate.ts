import {formatDate} from './formatDate'

export const getYearOfPublicationDate = (date: string) =>
  formatDate(date).slice(-4)
