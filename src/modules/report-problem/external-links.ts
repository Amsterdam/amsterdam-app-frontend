import {EnvUrlMap, Environment} from '@/environment'

const reportProblemUrl = {
  prod: 'https://app.meldingen.amsterdam.nl',
  acc: 'https://acc.app.meldingen.amsterdam.nl',
}

export const reportProblemExternalLinks: EnvUrlMap = {
  [Environment.production]: reportProblemUrl.prod,
  [Environment.acceptance]: reportProblemUrl.acc,
  [Environment.test]: reportProblemUrl.acc,
  [Environment.development]: reportProblemUrl.acc,
  [Environment.custom]: reportProblemUrl.acc,
}
