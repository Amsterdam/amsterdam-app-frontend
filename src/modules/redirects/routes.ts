export enum RedirectsRouteName {
  makeAppointment = 'makeAppointment',
  redirects = 'Redirects',
  selectCity = 'SelectCity',
}

export type RedirectsStackParams = {
  [RedirectsRouteName.makeAppointment]: undefined
  [RedirectsRouteName.selectCity]: undefined
  [RedirectsRouteName.redirects]: undefined
}
