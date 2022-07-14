export enum ContactRouteName {
  cityOffices = 'CityOffices',
  contact = 'Contact',
  makeAppointment = 'MakeAppointment',
}

export type ContactStackParams = {
  [ContactRouteName.cityOffices]: undefined
  [ContactRouteName.contact]: undefined
  [ContactRouteName.makeAppointment]: undefined
}
