import {SvgIconName} from '@/components/ui/media/svgIcons'
import {RedirectKey} from '@/modules/redirects/types'

export enum CityPassEndpointName {
  getAccessToken = 'getAccessToken',
  getBudgetTransactions = 'getBudgetTransactions',
  getCityPasses = 'getCityPasses',
  logout = 'logout',
}

export type AboutBlock = {
  icon: SvgIconName
  redirectKey: RedirectKey
  testID: string
  text: string
  title: string
}

export type BudgetTransaction = {
  amount: number
  amountFormatted: string
  budget: string
  budgetCode: string
  datePublished: string
  datePublishedFormatted: string
  description?: string
  id: string
  title: string
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

export type CityPassOwner = {
  firstname: string
  infix?: string
  initials: string
  lastname: string
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
  securityCode: string | null
}

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

// api
export type CityPassTokensResponse = {
  access_token: string
  refresh_token: string
}

export type CityPassResponse = CityPass[]

export type BudgetTransactionsParams = {
  accessToken: CityPassTokensResponse['access_token']
  budgetCode: CityPassBudget['code']
  passNumber: CityPass['passNumber']
}

// deeplink
export enum LoginResult {
  failed = 'mislukt',
  success = 'gelukt',
}
