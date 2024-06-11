import {EnvUrlMap, Environment} from '@/environment'

export const hiddenProject: EnvUrlMap = {
  [Environment.custom]: '351',
  [Environment.development]: '351',
  [Environment.test]: '353',
  [Environment.acceptance]: '348',
  [Environment.production]: '354',
}
