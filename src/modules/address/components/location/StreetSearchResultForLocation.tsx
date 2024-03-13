import {useEffect, useMemo, useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useLocationPermission} from '@/hooks/permissions/location'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {useGetAddressByCoordinates} from '@/modules/address/hooks/useGetAddressByCoordinates'
import {PdokAddress} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'

type Props = {
  selectResult: (item: PdokAddress) => void
  showSuggestionsForLocation: boolean
}

export const StreetSearchResultForLocation = ({
  selectResult,
  showSuggestionsForLocation,
}: Props) => {
  const [showFeedbackForNoResults, setShowFeedbackForNoResults] =
    useState(false)

  const {getCoordinates, isGettingAddressForCoordinates, pdokAddresses} =
    useGetAddressByCoordinates()

  const addresses = useMemo(
    () => pdokAddresses?.filter(addressIsInAmsterdamMunicipality),
    [pdokAddresses],
  )

  const {hasLocationPermission} = useLocationPermission()

  useBlurEffect(() => {
    setShowFeedbackForNoResults(false)
  })

  useEffect(() => {
    if (hasLocationPermission) {
      void getCoordinates()
    }
  }, [getCoordinates, hasLocationPermission])

  if (!showSuggestionsForLocation) {
    return null
  }

  if (isGettingAddressForCoordinates) {
    return null
  }

  if (!hasLocationPermission && !pdokAddresses) {
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
            testID="AddressUseLocationButton"
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
            testID="AddressNoSuggestionsMessage"
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
