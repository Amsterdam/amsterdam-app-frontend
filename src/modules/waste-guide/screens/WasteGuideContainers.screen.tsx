import {RouteProp} from '@react-navigation/core'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {WebView} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = {
  route: RouteProp<RootStackParams, WasteGuideRouteName.wasteGuideContainers>
}

const baseUrl = 'https://kaart.amsterdam.nl/afvalcontainers'
const containerTypes = [12491, 12492, 12493, 12494, 12495, 12496, 12497, 13698]

const coordinateSquare = (lon: number, lat: number, offset: number) => [
  lon - offset,
  lat - offset,
  lon + offset,
  lat + offset,
]

export const WasteGuideContainersScreen = ({route}: Props) => {
  const {lon, lat} = route.params
  const urlParams = coordinateSquare(lon, lat, 0.001)
  const url = urlParams
    ? `${baseUrl}#${urlParams.join('/')}/topo/${containerTypes.join(',')}//`
    : baseUrl

  return (
    <Screen scroll={false}>
      <WebView sliceFromTop={{portrait: 50, landscape: 50}} url={url} />
    </Screen>
  )
}
