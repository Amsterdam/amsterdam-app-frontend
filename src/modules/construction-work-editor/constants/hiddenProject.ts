import {Environment} from '@/environment'

export const hiddenProject: Record<Environment, string> = {
  [Environment.custom]: '351',
  [Environment.development]: '351',
  [Environment.test]: '353',
  [Environment.acceptance]: '',
  [Environment.production]: '',
}
