import {Button} from '_components/ui/buttons'
import {Paragraph} from '_components/ui/text'
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
  const {title, image, address, appointment} = data

  return (
    <>
      <Image source={mapImageSources(image.sources, environment)} />
      <Box insetHorizontal="md" insetVertical="lg">
        <Column gutter="lg">
          <NameAndAddress {...{address, title}} />
          <VisitingHours />
          {!!appointment && (
            <Paragraph variant="small">{appointment.text}</Paragraph>
          )}
          {!!appointment && (
            <Button
              label="Maak een afspraak"
              onPress={() => openWebUrl(appointment.url)}
            />
          )}
        </Column>
      </Box>
      {/* TODO Remove when we only show one city office through bottom sheet. */}
      <Gutter height="md" />
    </>
  )
}
