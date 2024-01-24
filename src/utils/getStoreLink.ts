import {isDevApp} from '@/processes/development'

export const getStoreLink = () =>
  `market://details?id=nl.amsterdam.app${isDevApp ? '.dev' : ''}`
