import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {PleaseWait, SomethingWentWrong} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Article, Paragraph, Title} from '@/components/ui/text'
import {NameAndAddress, VisitingHours} from '@/modules/contact/components'
import {useGetCityOfficesQuery} from '@/modules/contact/service'
import {selectCityOffice} from '@/modules/contact/slice'
import {useEnvironment} from '@/store'
import {mapImageSources, openWebUrl} from '@/utils'

type Props = {
  toggleBottomSheet: () => void
}

export const CityOffice = ({toggleBottomSheet}: Props) => {
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
        <Title level="h2" text="Bezoek ons" />
        <Image source={mapImageSources(image.sources, environment)} />
        <NameAndAddress
          {...{address, addressContent, title}}
          toggleBottomSheet={toggleBottomSheet}
        />
        <Column gutter="sm">
          {visitingHoursContent ? (
            <Article content={visitingHoursContent} />
          ) : (
            <VisitingHours visitingHours={visitingHours.regular} />
          )}
          {!!appointment && <Paragraph>{appointment.text}</Paragraph>}
        </Column>
        {!!appointment && (
          <Button
            label="Maak een afspraak"
            onPress={() => openWebUrl(appointment.url)}
          />
        )}
        {!!directionsUrl && (
          <Button
            label="Toon route"
            onPress={() => openWebUrl(directionsUrl)}
            variant={appointment ? 'secondary' : 'primary'}
          />
        )}
      </Column>
    </Box>
  )
}
