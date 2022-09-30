import {RouteProp} from '@react-navigation/core'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {WebView} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {getSquareMapArea} from '@/modules/waste-guide/utils'

type Props = {
  route: RouteProp<RootStackParams, WasteGuideRouteName.wasteGuideContainers>
}

const baseUrl = 'https://kaart.amsterdam.nl/afvalpunten'
const locationTypes = [14324]

export const CollectionPointsOnMapScreen = ({route}: Props) => {
  const {lon, lat} = route.params
  const urlParams = getSquareMapArea(lon, lat, 0.1)
  const url = urlParams
    ? `${baseUrl}#${urlParams.join('/')}/topo/${locationTypes.join(',')}//`
    : baseUrl

  return (
    <Screen scroll={false}>
      <WebView sliceFromTop={{portrait: 50, landscape: 50}} url={url} />
    </Screen>
  )
}
