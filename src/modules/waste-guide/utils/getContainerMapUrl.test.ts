import {WasteGuideUrl, FractionCode} from '@/modules/waste-guide/types'
import {getContainerMapUrl} from '@/modules/waste-guide/utils/getContainerMapUrl'

const allFractionsUrl = `${WasteGuideUrl.wasteContainersUrl}#52.370799999999996/4.8983/52.3748/4.902299999999999/topo/12491,12492,12493,12494,12495,13698,12497,12496//`

describe('getContainerMapUrl', () => {
  it('should return the waste containers url with all location types when no fraction code is provided', () => {
    const url = getContainerMapUrl({lat: 52.3728, lon: 4.9003}, undefined)

    expect(url).toEqual(allFractionsUrl)
  })

  it('should return the waste containers url with the location type for the given fraction code', () => {
    const url = getContainerMapUrl(
      {lat: 52.3728, lon: 4.9003},
      FractionCode.Papier,
    )

    expect(url).toEqual(
      `${WasteGuideUrl.wasteContainersUrl}#52.370799999999996/4.8983/52.3748/4.902299999999999/topo/12493//`,
    )
  })

  it('should return the waste containers url with all location types when the given fraction code is not in the mapping', () => {
    const url = getContainerMapUrl({lat: 52.3728, lon: 4.9003}, FractionCode.GA)

    expect(url).toEqual(allFractionsUrl)
  })
})
