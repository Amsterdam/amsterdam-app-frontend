import {FlatList} from 'react-native'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {AddressSwitch} from '@/modules/address/components/AddressSwitch'
import {HighAccuracyPurposeKey, type Address} from '@/modules/address/types'
import {PollingStationsListItem} from '@/modules/elections/components/PollingStationListItem'
import {PollingStation} from '@/modules/elections/types'
import {getSortedPollingStations} from '@/modules/elections/utils/getSortedPollingStations'
import {getDistance} from '@/utils/getDistance'

type Props = {
  address?: Address
  isError: boolean
  isLoading: boolean
  onPress: (id: PollingStation['id']) => void
  pollingStations?: PollingStation[]
}

export const PollingStationsList = ({
  address,
  isLoading,
  isError,
  onPress,
  pollingStations,
}: Props) => {
  if (isLoading) {
    return <PleaseWait testID="PollingStationsListPleaseWait" />
  }

  if (!pollingStations || !pollingStations.length || isError) {
    return <SomethingWentWrong testID="PollingStationsListSomethingWentWrong" />
  }

  const pollingStationsByDistance = getSortedPollingStations(
    pollingStations,
    address,
  )

  return (
    <Box
      insetBottom="md"
      insetLeft="md">
      <FlatList
        data={pollingStationsByDistance}
        ListHeaderComponent={
          <Column gutter="sm">
            <Box insetTop="lg">
              {!address && (
                <Title
                  level="h3"
                  shrink={0}
                  text="Voer een adres in en zie locaties in de buurt"
                />
              )}
              <AddressSwitch
                highAccuracyPurposeKey={
                  HighAccuracyPurposeKey.PreciseLocationAddressPollingStations
                }
                testID="PollingStationsListAddressSwitch"
              />
            </Box>
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
              onPress={onPress}
              pollingStation={pollingStation}
            />
          )
        }}
      />
    </Box>
  )
}
