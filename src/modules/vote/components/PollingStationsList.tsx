import {useCallback, useContext} from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSelector} from '@/hooks/redux/useSelector'
import {ShareLocationTopTaskButton} from '@/modules/address/components/location/ShareLocationTopTaskButton'
import {selectAddress} from '@/modules/address/slice'
import {PollingStationsListItem} from '@/modules/vote/components/PollingStationListItem'
import {PollingStationContext} from '@/modules/vote/providers/PollingStation.context'

import {
  PollingStation,
  PollingStationsListBottomSheetVariant,
} from '@/modules/vote/types'
import {getSortedPollingStations} from '@/modules/vote/utils/getSortedPollingStations'
import {useBottomSheet} from '@/store/slices/bottomSheet'
import {getDistance} from '@/utils/getDistance'

type Props = {
  pollingStations?: PollingStation[]
}

export const PollingStationsList = ({pollingStations}: Props) => {
  const {setPollingStation} = useContext(PollingStationContext)
  const {open} = useBottomSheet()
  const address = useSelector(selectAddress)

  const onPressListItem = useCallback(
    (pollingStation: PollingStation) => {
      setPollingStation(pollingStation)
      open(PollingStationsListBottomSheetVariant.pollingStation)
    },
    [setPollingStation, open],
  )

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
