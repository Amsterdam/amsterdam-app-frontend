import React from 'react'
import {Button} from '@/components/ui/buttons'
import {Column, Gutter} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Article, Paragraph} from '@/components/ui/text'
import {NameAndAddress, VisitingHours} from '@/modules/contact/components'
import {CityOffice as CityOfficeType} from '@/modules/contact/types'
import {useEnvironment} from '@/store'
import {mapImageSources} from '@/utils'
import {openWebUrl} from '@/utils/openWebUrl'

type Props = {
  data: CityOfficeType
  toggleBottomSheet: () => void
}

export const CityOffice = ({data, toggleBottomSheet}: Props) => {
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
      {/* TODO Remove when we only show one city office through bottom sheet. */}
      <Gutter height="xl" />
    </>
  )
}
