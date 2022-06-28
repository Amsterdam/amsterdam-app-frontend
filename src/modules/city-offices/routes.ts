export enum CityOfficesRouteName {
  cityOffices = 'CityOffices',
  contact = 'Contact',
  makeAppointment = 'MakeAppointment',
}

export type CityOfficesStackParams = {
  [CityOfficesRouteName.cityOffices]: undefined
  [CityOfficesRouteName.contact]: undefined
  [CityOfficesRouteName.makeAppointment]: undefined
}
