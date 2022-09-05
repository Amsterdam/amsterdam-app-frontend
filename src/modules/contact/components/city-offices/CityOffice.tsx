import {Button} from '_components/ui/buttons'
import {Article, Paragraph} from '_components/ui/text'
import {openWebUrl} from '_utils/openWebUrl'
import React from 'react'
import {Box} from '@/components/ui'
import {Column, Gutter} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {NameAndAddress, VisitingHours} from '@/modules/contact/components'
import {CityOffice as CityOfficeType} from '@/modules/contact/types'
import {useEnvironment} from '@/store'
import {mapImageSources} from '@/utils'

type Props = {
  data: CityOfficeType
}

export const CityOffice = ({data}: Props) => {
  const environment = useEnvironment()
  const {
    title,
    image,
    address,
    appointment,
    addressContent,
    directionsUrl,
    visitingHoursContent,
  } = data

  return (
    <>
      <Column gutter="lg">
        <Image source={mapImageSources(image.sources, environment)} />
        <Box insetHorizontal="md">
          <NameAndAddress {...{address, addressContent, title}} />
        </Box>
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
      {/* TODO Remove when we only show one city office through bottom sheet. */}
      <Gutter height="xl" />
    </>
  )
}
