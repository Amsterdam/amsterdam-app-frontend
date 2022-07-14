export enum ContactRouteName {
  cityOffices = 'CityOffices',
  contactForm = 'ContactForm',
  makeAppointment = 'MakeAppointment',
}

export type ContactStackParams = {
  [ContactRouteName.cityOffices]: undefined
  [ContactRouteName.contactForm]: undefined
  [ContactRouteName.makeAppointment]: undefined
}
