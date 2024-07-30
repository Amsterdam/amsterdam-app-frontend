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

export type CityPassBase = {
  actief: boolean
  budgetten: BudgetBase[]
  categorie: string
  categorie_code: string
  expiry_date: string
  id: number
  pasnummer: number
  pasnummer_volledig: string
  passoort: PassType
}
export type CityPass = CityPassBase & {
  balance_update_time: Date
  budgetten_actief: boolean
  eigenaar: string
  originele_pas: OriginalPass
}

export type BudgetBase = {code: string; naam: string}

export type Budget = BudgetBase & {
  budget_assigned: number
  budget_balance: number
  expiry_date: string
  omschrijving: string
}

export type OriginalPass = {
  categorie: string
  categorie_code: string
  id: number
  pasnummer: number
  pasnummer_volledig: string
  passoort: PassType
}

export type PassType = {
  id: number
  naam: string
}

export type PassOwner = {
  achternaam: string
  initialen: string
  passen: CityPassBase[]
  voornaam: string
}

export type Transaction = {
  aanbieder?: TransActionSupplier
  bedrag: number
  budget?: TransactionBudget
  id: number
  omschrijving?: string
  transactiedatum: string
}

type TransactionBudget = {
  aanbieder: TransActionSupplier
  code: string
  id: number
  naam: string
}

type TransActionSupplier = {
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
