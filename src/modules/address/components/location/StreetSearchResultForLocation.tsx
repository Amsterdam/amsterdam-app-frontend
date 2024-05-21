import {skipToken} from '@reduxjs/toolkit/query'
import {useCallback, useMemo, useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {usePermission} from '@/hooks/permissions/usePermission'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {useStartGettingLocation} from '@/modules/address/hooks/useStartGettingLocation'
import {useGetLocationQuery} from '@/modules/address/service'
import {useLocation} from '@/modules/address/slice'
import {PdokAddress} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'
import {Permissions} from '@/types/permissions'

const NUM_OF_SEARCH_RESULTS = 5

type Props = {
  selectResult: (item: PdokAddress) => void
}

export const StreetSearchResultForLocation = ({selectResult}: Props) => {
  const [showFeedbackForNoResults, setShowFeedbackForNoResults] =
    useState(false)
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )
  const {isGettingLocation, location} = useLocation()
  const {currentData, isLoading, isUninitialized} = useGetLocationQuery(
    !isGettingLocation && location?.coordinates
      ? {...location.coordinates, rows: NUM_OF_SEARCH_RESULTS}
      : skipToken,
  )
  const pdokAddresses = currentData?.response?.docs

  const addresses = useMemo(
    () => pdokAddresses?.filter(addressIsInAmsterdamMunicipality),
    [pdokAddresses],
  )

  const {hasPermission: hasLocationPermission, requestPermission} =
    usePermission(Permissions.location)

  useBlurEffect(() => {
    setShowFeedbackForNoResults(false)
  })

  const onPressUseLocationButton = useCallback(async () => {
    setShowFeedbackForNoResults(true)

    try {
      const permission = await requestPermission()

      if (!permission) {
        navigateToInstructionsScreen()
      }
    } catch (error) {
      return
    }
  }, [navigateToInstructionsScreen, requestPermission])

  useStartGettingLocation()

  if (!hasLocationPermission && !pdokAddresses) {
    return (
      <Box insetVertical="md">
        <Row>
          <Button
            iconName="pointer"
            label="Gebruik mijn huidige locatie"
            onPress={onPressUseLocationButton}
            testID="AddressUseLocationButton"
            variant="tertiary"
          />
        </Row>
      </Box>
    )
  }

  if (isGettingLocation || isLoading || isUninitialized) {
    return null
  }

  const hasResults = !!addresses && addresses.length > 0
  const showTitle = hasResults || showFeedbackForNoResults
  const showNoResultsMessage = !hasResults && showFeedbackForNoResults

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
            text="Geen suggesties gevonden voor uw huidige locatie."
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
