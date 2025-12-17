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
import {useRequestLocationFetch} from '@/modules/address/hooks/useRequestLocationFetch'
import {useGetLocationQuery} from '@/modules/address/service'
import {useLocation} from '@/modules/address/slice'
import {BaseAddress, Address} from '@/modules/address/types'
import {addressIsInAmsterdamMunicipality} from '@/modules/address/utils/addressIsInAmsterdamMunicipality'
import {Permissions} from '@/types/permissions'

type Props = {
  selectResult: (item: Address | BaseAddress) => void
}

export const StreetSearchResultForLocation = ({selectResult}: Props) => {
  const [showFeedbackForNoResults, setShowFeedbackForNoResults] =
    useState(false)
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen(
    Permissions.location,
  )
  const {isGettingLocation, location} = useLocation()
  const {startLocationFetch} = useRequestLocationFetch()

  const {currentData, isLoading, isUninitialized} = useGetLocationQuery(
    !isGettingLocation && location?.coordinates
      ? location.coordinates
      : skipToken,
  )

  const addresses = useMemo(
    () => currentData?.filter(addressIsInAmsterdamMunicipality),
    [currentData],
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

      startLocationFetch()
    } catch (error) {
      return
    }
  }, [navigateToInstructionsScreen, requestPermission, startLocationFetch])

  if (!hasLocationPermission && !addresses?.length) {
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
    <Column gutter="sm">
      {!!showTitle && (
        <Title
          color="secondary"
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
  )
}
