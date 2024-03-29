import {useCallback, useEffect, useMemo, useState} from 'react'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {EmptyMessage} from '@/components/ui/feedback/EmptyMessage'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Title} from '@/components/ui/text/Title'
import {useBlurEffect} from '@/hooks/navigation/useBlurEffect'
import {usePermission} from '@/hooks/permissions/usePermission'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {AddressSearchSuggestions} from '@/modules/address/components/AddressSearchSuggestions'
import {useGetLocation} from '@/modules/address/hooks/useGetLocation'
import {useLocationType} from '@/modules/address/hooks/useLocationType'
import {useNavigateToInstructionsScreen} from '@/modules/address/hooks/useNavigateToInstructionsScreen'
import {setGetLocation} from '@/modules/address/slice'
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
  const dispatch = useDispatch()
  const [showFeedbackForNoResults, setShowFeedbackForNoResults] =
    useState(false)
  const navigateToInstructionsScreen = useNavigateToInstructionsScreen()
  const {isGettingLocation, pdokAddresses} = useGetLocation()
  const {setLocationType} = useLocationType()

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
    const permission = await requestPermission()

    if (!permission) {
      navigateToInstructionsScreen()

      return
    }

    setLocationType('location')
  }, [setLocationType, navigateToInstructionsScreen, requestPermission])

  useEffect(() => {
    dispatch(setGetLocation())
  }, [dispatch])

  if (!showSuggestionsForLocation) {
    return null
  }

  if (isGettingLocation) {
    return null
  }

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
