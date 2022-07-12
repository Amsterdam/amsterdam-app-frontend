import {isDevApp} from '@/processes'

export const articlesMaxAgeInDays = isDevApp ? 60 : 3
