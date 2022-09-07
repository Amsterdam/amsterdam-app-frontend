import React from 'react'
import {useSelector} from 'react-redux'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {SomethingWentWrong} from '@/components/ui/feedback'
import {Column, Gutter} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Article, Paragraph, Title} from '@/components/ui/text'
import {NameAndAddress, VisitingHours} from '@/modules/contact/components'
import {cityOffices} from '@/modules/contact/data'
import {selectCityOffice} from '@/modules/contact/slice'
import {useEnvironment} from '@/store'
import {mapImageSources} from '@/utils'
import {openWebUrl} from '@/utils/openWebUrl'

type Props = {
  toggleBottomSheet: () => void
}

export const CityOffice = ({toggleBottomSheet}: Props) => {
  const environment = useEnvironment()
  const cityOfficeId =
    useSelector(selectCityOffice) ?? cityOffices[0].identifier
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
    visitingHoursContent,
  } = cityOffice

  return (
    <Box>
      <Title level="h2" text="Bezoek ons" />
      <Gutter height="md" />
      <Column gutter="lg">
        <Image source={mapImageSources(image.sources, environment)} />
        <NameAndAddress
          {...{address, addressContent, title}}
          toggleBottomSheet={toggleBottomSheet}
        />
        <Column gutter="md">
          <Column gutter="sm">
            {visitingHoursContent ? (
              <Article content={visitingHoursContent} />
            ) : (
              <VisitingHours />
            )}
            {!!appointment && (
              <Paragraph variant="small">{appointment.text}</Paragraph>
            )}
          </Column>
        </Column>
        <Column gutter="md">
          {!!directionsUrl && (
            <Button
              label="Toon route"
              onPress={() => openWebUrl(directionsUrl)}
              variant={appointment ? 'secondary' : 'primary'}
            />
          )}
          {!!appointment && (
            <Button
              label="Maak een afspraak"
              onPress={() => openWebUrl(appointment.url)}
            />
          )}
        </Column>
      </Column>
    </Box>
  )
}
