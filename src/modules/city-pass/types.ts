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

export type CityPassBaseOld = {
  actief: boolean
  budgetten: BudgetBaseOld[]
  categorie: string
  categorie_code: string
  expiry_date: string
  id: number
  pasnummer: number
  pasnummer_volledig: string
  passoort: PassTypeOld
}
export type CityPassOld = CityPassBaseOld & {
  balance_update_time: Date
  budgetten_actief: boolean
  eigenaar: string
  originele_pas: OriginalPassOld
}

export type BudgetBaseOld = {code: string; naam: string}

export type BudgetOld = BudgetBaseOld & {
  budget_assigned: number
  budget_balance: number
  expiry_date: string
  omschrijving: string
}

export type OriginalPassOld = {
  categorie: string
  categorie_code: string
  id: number
  pasnummer: number
  pasnummer_volledig: string
  passoort: PassTypeOld
}

export type PassTypeOld = {
  id: number
  naam: string
}

export type PassOwnerOld = {
  achternaam: string
  initialen: string
  passen: CityPassBaseOld[]
  voornaam: string
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
  infix: string
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

export type SecureCityPass = {
  d: CityPass['dateEndFormatted']
  f: CityPassOwner['firstname']
  i?: CityPassOwner['infix']
  l: CityPassOwner['lastname']
  p: CityPass['passNumberComplete']
}
