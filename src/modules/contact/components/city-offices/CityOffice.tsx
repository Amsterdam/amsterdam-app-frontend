import {Box} from '_components/ui'
import React from 'react'
import {Button} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Article, Paragraph} from '@/components/ui/text'
import {NameAndAddress, VisitingHours} from '@/modules/contact/components'
import {cityOffices} from '@/modules/contact/data'
import {useEnvironment} from '@/store'
import {mapImageSources} from '@/utils'
import {openWebUrl} from '@/utils/openWebUrl'

type Props = {
  toggleBottomSheet: () => void
}

export const CityOffice = ({toggleBottomSheet}: Props) => {
  const environment = useEnvironment()
  const {
    title,
    image,
    address,
    appointment,
    addressContent,
    directionsUrl,
    visitingHoursContent,
  } = cityOffices[0]

  return (
    <Box>
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
