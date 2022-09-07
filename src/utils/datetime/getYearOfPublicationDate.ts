import {formatDate} from '@/utils'

export const getYearOfPublicationDate = (date: string) =>
  formatDate(date).slice(-4)
