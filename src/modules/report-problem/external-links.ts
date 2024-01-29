import {EnvUrlMap, Environment} from '@/environment'

export const reportProblemExternalLinks: EnvUrlMap = {
  [Environment.production]: 'https://app.meldingen.amsterdam.nl',
  [Environment.acceptance]: 'https://acc.app.meldingen.amsterdam.nl',
}
