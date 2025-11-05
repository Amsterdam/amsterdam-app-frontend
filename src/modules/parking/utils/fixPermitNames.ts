import {ParkingPermit} from '@/modules/parking/types'

/*
 * This function checks whether there are 2 permits with the same type and if so it appends the report code of the permit to the name.
 */
export const fixPermitNames = (permits: ParkingPermit[]) => {
  const permitNameCounts = permits.reduce(
    (acc, permit) => {
      acc[permit.permit_name] = (acc[permit.permit_name] || 0) + 1

      return acc
    },
    {} as Record<string, number>,
  )

  return permits.map(permit => {
    if (permitNameCounts[permit.permit_name] > 1) {
      return {
        ...permit,
        permit_name: `${permit.permit_name} (${permit.report_code})`,
      }
    }

    return permit
  })
}
