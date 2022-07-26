import {formatDate} from '@/utils/datetime/formatDate'

export const getYearOfPublicationDate = (date: string) =>
  formatDate(date).slice(-4)
