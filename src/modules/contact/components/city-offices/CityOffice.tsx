import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {SomethingWentWrong} from '@/components/ui/feedback/SomethingWentWrong'
import {Column} from '@/components/ui/layout/Column'
import {LazyImage} from '@/components/ui/media/LazyImage'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useSelector} from '@/hooks/redux/useSelector'
import {NameAndAddress} from '@/modules/contact/components/city-offices/NameAndAddress'
import {VisitingHours} from '@/modules/contact/components/city-offices/VisitingHours'
import {WaitingTime} from '@/modules/contact/components/city-offices/WaitingTime'
import {useGetCityOfficesQuery} from '@/modules/contact/service'
import {selectCityOffice} from '@/modules/contact/slice'
import {isOpenForVisiting} from '@/modules/contact/utils/isOpenForVisiting'
import {mapImageSources} from '@/modules/contact/utils/mapImageSources'

export const CityOffice = () => {
  const openWebUrl = useOpenWebUrl()
  const selectedCityOfficeId = useSelector(selectCityOffice)
  const {data: cityOffices, isLoading, refetch} = useGetCityOfficesQuery()

  if (isLoading) {
    return <PleaseWait testID="ContactCityOfficesLoadingSpinner" />
  }

  const cityOfficeId = selectedCityOfficeId ?? cityOffices?.[0]?.identifier
  const cityOffice = cityOffices?.find(c => c.identifier === cityOfficeId)

  if (!cityOffice) {
    return (
      <SomethingWentWrong
        inset="md"
        retryFn={refetch}
        testID="ContactCityOfficeSomethingWentWrong"
        text="Door een technische storing is het Stadsloket niet te zien. Probeer het later nog eens."
        title=""
      />
    )
  }

  const {
    identifier,
    title,
    image,
    address,
    appointment,
    addressContent,
    directionsUrl,
    visitingHours,
    visitingHoursContent,
  } = cityOffice

  const imageSources = mapImageSources(image.sources)

  return (
    <Box>
      <Column gutter="md">
        <Title
          level="h2"
          testID="ContactVisitUsTitle"
          text="Bezoek ons"
        />
        <LazyImage
          key={imageSources?.[0].uri}
          source={imageSources}
          testID="ContactVisitUsImage"
        />
        <NameAndAddress
          address={address}
          addressContent={addressContent}
          title={title}
        />
        <VisitingHours
          visitingHours={visitingHours.regular}
          visitingHoursContent={visitingHoursContent}
          visitingHoursExceptions={visitingHours.exceptions}
        />
        {appointment ? (
          <Column gutter="md">
            <Paragraph testID="ContactMakeAppointmentParagraph">
              {appointment.text}
            </Paragraph>
            <Button
              accessibilityHint="Opent een link naar een formulier."
              accessibilityRole="link"
              label="Maak een afspraak"
              onPress={() => openWebUrl(appointment.url)}
              testID="ContactMakeAppointmentButton"
            />
          </Column>
        ) : (
          isOpenForVisiting(
            visitingHours.regular,
            visitingHours.exceptions,
          ) && <WaitingTime cityOfficeId={identifier} />
        )}
        {!!directionsUrl && (
          <Button
            accessibilityHint="Opent een link naar Google Maps."
            accessibilityRole="link"
            label="Bekijk route"
            onPress={() => openWebUrl(directionsUrl)}
            testID="ContactSeeRouteButton"
            variant={appointment ? 'secondary' : 'primary'}
          />
        )}
      </Column>
    </Box>
  )
}
