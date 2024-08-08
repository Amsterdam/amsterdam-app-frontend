import {SvgIconName} from '@/components/ui/media/svgIcons'
import {RedirectKey} from '@/modules/redirects/types'

export enum CityPassEndpointName {
  getAccessToken = 'getAccessToken',
  getCityPasses = 'getCityPasses',
}

export type CityPassTokensResponse = {
  access_token: string
  refresh_token: string
}

export type TransactionOld = {
  aanbieder?: TransActionSupplierOld
  bedrag: number
  budget?: TransactionBudgetOld
  id: number
  omschrijving?: string
  transactiedatum: string
}

type TransactionBudgetOld = {
  aanbieder: TransActionSupplierOld
  code: string
  id: number
  naam: string
}

type TransActionSupplierOld = {
  id: number
  naam: string
}

export type AboutBlock = {
  icon: SvgIconName
  redirectKey: RedirectKey
  testID: string
  text: string
  title: string
}

export enum LoginResult {
  failed = 'mislukt',
  success = 'gelukt',
}

export type CityPassOwner = {
  firstname: string
  infix?: string
  initials: string
  lastname: string
}

export type CityPassBudget = {
  budgetAssigned: number
  budgetAssignedFormatted: string
  budgetBalance: number
  budgetBalanceFormatted: string
  code: string
  dateEnd: string
  dateEndFormatted: string
  description: string
  title: string
}

export type CityPass = {
  balanceFormatted: string
  budgets: CityPassBudget[]
  dateEnd: string
  dateEndFormatted: string
  id: string
  owner: CityPassOwner
  passNumber: number
  passNumberComplete: string
}

export type CityPassResponse = CityPass[]

export type CityPassPass = Pick<
  CityPass,
  'dateEndFormatted' | 'passNumberComplete'
> &
  Pick<CityPassOwner, 'firstname' | 'infix' | 'lastname'>

export type SecureCityPass = {
  d: CityPassPass['dateEndFormatted']
  f: CityPassPass['firstname']
  i?: CityPassPass['infix']
  l: CityPassPass['lastname']
  p: CityPassPass['passNumberComplete']
}
