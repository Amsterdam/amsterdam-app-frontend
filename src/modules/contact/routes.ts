export enum ContactRouteName {
  contact = 'Contact',
  contactForm = 'ContactForm',
  makeAppointment = 'MakeAppointment',
}

export type ContactStackParams = {
  [ContactRouteName.contact]: undefined
  [ContactRouteName.contactForm]: undefined
  [ContactRouteName.makeAppointment]: undefined
}

export enum ContactModalName {}

export type ContactModalParams = Record<string, never>
