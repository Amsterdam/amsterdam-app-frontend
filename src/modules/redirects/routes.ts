export enum RedirectsRouteName {
  makeAppointment = 'makeAppointment',
  selectCity = 'SelectCity',
  redirects = 'Redirects',
}

export type RedirectsStackParams = {
  [RedirectsRouteName.makeAppointment]: undefined
  [RedirectsRouteName.selectCity]: undefined
  [RedirectsRouteName.redirects]: undefined
}
