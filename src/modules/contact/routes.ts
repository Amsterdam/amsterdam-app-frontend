export enum ContactRouteName {
  contact = 'Contact',
  makeAppointment = 'MakeAppointment',
}

export type ContactStackParams = {
  [ContactRouteName.contact]: undefined
  [ContactRouteName.makeAppointment]: undefined
}

export enum ContactModalName {}

export type ContactModalParams = Record<string, never>
