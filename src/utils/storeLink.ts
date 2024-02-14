import {isDevApp} from '@/processes/development'

export const STORE_LINK = `market://details?id=nl.amsterdam.app${isDevApp ? '.dev' : ''}`
