export const extractAddressFromParkingMachineName = (name: string) =>
  name.replaceAll(/'|T\/O.*/g, '').trim()
