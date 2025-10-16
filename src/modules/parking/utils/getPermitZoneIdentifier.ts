export const getPermitZoneIdentifier = (permit_zone?: {
  name: string
  permit_zone_id: string
}) => {
  if (!permit_zone) {
    return ''
  }

  const pattern = /^(?=.*\d)[A-Za-z0-9]{5,10}$/

  if (pattern.test(permit_zone.permit_zone_id)) {
    return `${permit_zone?.permit_zone_id} ${permit_zone?.name}`
  }

  return permit_zone.name
}
