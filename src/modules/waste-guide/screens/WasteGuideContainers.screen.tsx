import {RouteProp} from '@react-navigation/core'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {WebView} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'
import {coordinatesSquare} from '@/modules/waste-guide/utils'

type Props = {
  route: RouteProp<RootStackParams, WasteGuideRouteName.wasteGuideContainers>
}

const baseUrl = 'https://kaart.amsterdam.nl/afvalcontainers'
const locationTypes = [12491, 12492, 12493, 12494, 12495, 12496, 12497, 13698]

export const WasteGuideContainersScreen = ({route}: Props) => {
  const {lon, lat} = route.params
  const urlParams = coordinatesSquare(lon, lat, 0.001)
  const url = urlParams
    ? `${baseUrl}#${urlParams.join('/')}/topo/${locationTypes.join(',')}//`
    : baseUrl

  return (
    <Screen scroll={false}>
      <WebView sliceFromTop={{portrait: 50, landscape: 50}} url={url} />
    </Screen>
  )
}
