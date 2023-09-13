import {useFocusEffect} from '@react-navigation/native'
import {useEffect, useMemo, useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {useCheckLocationPermission} from '@/modules/address/hooks/useCheckLocationPermission'
import {useGetAddressByCoordinates} from '@/modules/address/hooks/useGetAddressByCoordinates'
import {PdokAddress} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'

type Props = {
  selectResult: (item: PdokAddress) => void
}

export const StreetSearchResultForLocation = ({selectResult}: Props) => {
  const [showFeedbackForNoResults, setShowFeedbackForNoResults] =
    useState(false)

  const {getCoordinates, isGettingAddressForCoordinates, pdokAddresses} =
    useGetAddressByCoordinates()

  const addresses = useMemo(
    () => pdokAddresses?.filter(addressIsInAmsterdamMunicipality),
    [pdokAddresses],
  )

  const {
    isCheckingLocationPermission,
    hasLocationPermission,
    checkLocationPermission,
  } = useCheckLocationPermission()

  useFocusEffect(() => {
    checkLocationPermission()
  })

  useBlurEffect(() => {
    setShowFeedbackForNoResults(false)
  })

  useEffect(() => {
    if (hasLocationPermission) {
      void getCoordinates()
    }
  }, [getCoordinates, hasLocationPermission])

  if (isCheckingLocationPermission || isGettingAddressForCoordinates) {
    return (
      <Box>
        <Icon
          color="link"
          name="spinner"
          size="lg"
        />
      </Box>
    )
  }

  if (!hasLocationPermission) {
    return (
      <Box insetVertical="md">
        <Row>
          <Button
            iconName="pointer"
            label="Gebruik mijn huidige locatie"
            onPress={() => {
              setShowFeedbackForNoResults(true)
              void getCoordinates()
            }}
            variant="tertiary"
          />
        </Row>
      </Box>
    )
  }

  const hasResults = !!addresses && addresses.length > 0
  const showTitle = hasResults || showFeedbackForNoResults
  const showNoResultsMessage = !hasResults && !!showFeedbackForNoResults

  return (
    <Box insetTop="lg">
      <Column gutter="sm">
        {!!showTitle && (
          <Title
            level="h5"
            text="Suggesties"
          />
        )}
        {!!showNoResultsMessage && (
          <EmptyMessage
            showTitle={false}
            text="Geen suggesties gevonden voor je huidige locatie."
          />
        )}
        <AddressSearchSuggestions
          addresses={addresses}
          selectResult={selectResult}
        />
      </Column>
    </Box>
  )
}
