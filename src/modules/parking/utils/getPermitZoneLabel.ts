export const getPermitZoneLabel = (permit_zone?: {
  name: string
  permit_zone_id: string
}) => {
  if (!permit_zone) {
    return ''
  }

  const {permit_zone_id, name} = permit_zone

  if (permit_zone_id === name) {
    return permit_zone.name
  }

  return `${permit_zone_id} ${name}`
}
