import {isDevApp} from '@/processes/development'

export const getStoreLink = () =>
  `itms-apps://apps.apple.com/nl/app/${
    isDevApp
      ? '/amsterdam-app-test/id1624518482'
      : '/de-amsterdam-app/id1624518847'
  }`
