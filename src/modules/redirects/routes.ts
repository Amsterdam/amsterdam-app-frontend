export enum RedirectsRouteName {
  appointmentOverview = 'AppointmentOverview',
  cityOfficeSelection = 'CityOfficeSelection',
  redirects = 'Redirects',
}

export type RedirectsStackParams = {
  [RedirectsRouteName.appointmentOverview]: undefined
  [RedirectsRouteName.cityOfficeSelection]: undefined
  [RedirectsRouteName.redirects]: undefined
}
