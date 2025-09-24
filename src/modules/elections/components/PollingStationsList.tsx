import {useContext} from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {selectAddress} from '@/modules/address/slice'
import {PollingStationsListItem} from '@/modules/elections/components/PollingStationListItem'
import {PollingStationContext} from '@/modules/elections/providers/PollingStation.context'

import {
  PollingStation,
  PollingStationsListBottomSheetVariant,
} from '@/modules/elections/types'
import {getSortedPollingStations} from '@/modules/elections/utils/getSortedPollingStations'
import {getDistance} from '@/utils/getDistance'

type Props = {
  pollingStations?: PollingStation[]
}

export const PollingStationsList = ({pollingStations}: Props) => {
  const {onPressListItem} = useContext(PollingStationContext)
  const address = useSelector(selectAddress)

  if (!pollingStations || !pollingStations.length) {
    return null
  }

  const pollingStationsByDistance = getSortedPollingStations(
    pollingStations,
    address,
  )

  return (
    <Box
      insetBottom="md"
      insetHorizontal="md"
      insetTop="lg">
      <FlatList
        data={pollingStationsByDistance}
        ListHeaderComponent={
          <Column gutter="sm">
            {!address && (
              <Title
                level="h3"
                shrink={0}
                text="Voer een adres in en zie locaties in de buurt"
              />
            )}
            <ShareLocationTopTaskButton
              newVariant={PollingStationsListBottomSheetVariant.address}
              testID="PollingStationsListRequestLocationButton"
            />
            <Phrase color="secondary">{`Resultaten${address ? ' gesorteerd op afstand' : ''}:`}</Phrase>
          </Column>
        }
        renderItem={({item: pollingStation}) => {
          let distanceInMeters: number | undefined

          if (address?.coordinates) {
            distanceInMeters = getDistance(
              {
                lat: pollingStation.position.lat,
                lon: pollingStation.position.lng,
              },
              address.coordinates,
            )
          }

          return (
            <PollingStationsListItem
              distanceInMeters={distanceInMeters}
              onPress={onPressListItem}
              pollingStation={pollingStation}
            />
          )
        }}
      />
    </Box>
  )
}
