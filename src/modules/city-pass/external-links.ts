import {EnvUrlMap, Environment} from '@/environment'

const getCityPassUrl = (env: string) =>
  `https://${env}mijn.amsterdam.nl/api/v1/services/amsapp/stadspas/login/`

const cityPassUrl = {
  acc: getCityPassUrl('az-acc.'),
  prod: getCityPassUrl(''),
  test: getCityPassUrl('test.'),
}

export const cityPassExternalLinks: EnvUrlMap = {
  [Environment.production]: cityPassUrl.prod,
  [Environment.acceptance]: cityPassUrl.acc,
  [Environment.test]: cityPassUrl.test,
  [Environment.development]: cityPassUrl.test,
  [Environment.custom]: cityPassUrl.test,
}
