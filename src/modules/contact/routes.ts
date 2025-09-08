export enum ContactRouteName {
  cityOffice = 'CityOffice',
  contact = 'Contact',
}

export type ContactStackParams = {
  [ContactRouteName.cityOffice]: undefined
  [ContactRouteName.contact]: undefined
}

export enum ContactModalName {}

export type ContactModalParams = Record<string, never>
