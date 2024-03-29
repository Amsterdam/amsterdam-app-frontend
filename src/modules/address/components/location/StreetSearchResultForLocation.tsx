import {useCallback, useEffect, useMemo, useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {usePermission} from '@/hooks/permissions/usePermission'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {useGetAddressByCoordinates} from '@/modules/address/hooks/useGetAddressByCoordinates'
import {AddressModalName} from '@/modules/address/routes'
import {PdokAddress} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'
import {Permissions} from '@/types/permissions'

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

  const {hasPermission: hasLocationPermission, requestPermission} =
    usePermission(Permissions.location)

  useBlurEffect(() => {
    setShowFeedbackForNoResults(false)
  })

  useEffect(() => {
    if (hasLocationPermission) {
      void getCoordinates()
    }
  }, [getCoordinates, hasLocationPermission])

  const {navigate} = useNavigation<AddressModalName>()
  const onPress = useCallback(() => {
    setShowFeedbackForNoResults(true)
    void requestPermission().then(granted => {
      if (!granted) {
        navigate(AddressModalName.locationPermissionInstructions)
      }
    })
  }, [navigate, requestPermission])

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
            onPress={onPress}
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
