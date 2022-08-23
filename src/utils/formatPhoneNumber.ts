/**
 * Adds a space after every 2 digits
 */
export const formatPhoneNumber = (phoneNumber: string) =>
  phoneNumber
    .split(' ')
    .join('')
    .match(/.{1,2}/g)
    ?.join(' ')
