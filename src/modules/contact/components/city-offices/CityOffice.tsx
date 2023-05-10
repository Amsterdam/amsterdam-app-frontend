import {useSelector} from 'react-redux'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {PleaseWait, SomethingWentWrong} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {useOpenWebUrl} from '@/hooks'
import {
  NameAndAddress,
  VisitingHours,
  WaitingTime,
} from '@/modules/contact/components'
import {useGetCityOfficesQuery} from '@/modules/contact/service'
import {selectCityOffice} from '@/modules/contact/slice'
import {isOpenForVisiting} from '@/modules/contact/utils'
import {useEnvironment} from '@/store'
import {mapImageSources} from '@/utils'

export const CityOffice = () => {
  const openWebUrl = useOpenWebUrl()
  const environment = useEnvironment()
  const selectedCityOfficeId = useSelector(selectCityOffice)
  const {data: cityOffices, isLoading} = useGetCityOfficesQuery()

  if (isLoading || !cityOffices) {
    return <PleaseWait />
  }

  const cityOfficeId = selectedCityOfficeId ?? cityOffices[0]?.identifier
  const cityOffice = cityOffices.find(c => c.identifier === cityOfficeId)

  if (!cityOffice) {
    return <SomethingWentWrong />
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

  return (
    <Box>
      <Column gutter="md">
        <Title level="h2" testID="ContactVisitUsTitle" text="Bezoek ons" />
        <Image source={mapImageSources(image.sources, environment)} />
        <NameAndAddress {...{address, addressContent, title}} />
        <VisitingHours
          visitingHours={visitingHours.regular}
          visitingHoursContent={visitingHoursContent}
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
          isOpenForVisiting(visitingHours.regular) && (
            <WaitingTime cityOfficeId={identifier} />
          )
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
