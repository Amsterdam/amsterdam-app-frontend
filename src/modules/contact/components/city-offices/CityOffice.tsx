import React, {SVGProps} from 'react'
import {CityOffice as CityOfficeIcon} from '@/assets/icons'
import {Box, SingleSelectable} from '@/components/ui'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Icon, Image} from '@/components/ui/media'
import {Phrase, Title} from '@/components/ui/text'
import {CityOffice as CityOfficeType} from '@/modules/contact/types'
import {useEnvironment} from '@/store'
import {Theme, useThemable} from '@/themes'
import {accessibleText, mapImageSources} from '@/utils'

type Props = {
  data: CityOfficeType
}

export const CityOffice = ({data}: Props) => {
  const environment = useEnvironment()
  const {title, image, address} = data
  const iconProps = useThemable(createIconProps)

  return (
    <>
      <Image source={mapImageSources(image.sources, environment)} />
      <Box insetHorizontal="md" insetVertical="lg">
        <Row gutter="md">
          <Column>
            <Gutter height="sm" />
            <Icon size={32}>
              <CityOfficeIcon {...iconProps} />
            </Icon>
          </Column>
          <Column>
            <Title level="h5" text={title} />
            <SingleSelectable
              accessibilityLabel={accessibleText(
                'Adres',
                `${address.streetName} ${address.streetNumber}`,
                address.postalCode,
                address.city,
              )}>
              <Phrase variant="small">
                {address.streetName} {address.streetNumber}
              </Phrase>
              <Phrase variant="small">
                {address.postalCode} {address.city}
              </Phrase>
            </SingleSelectable>
          </Column>
        </Row>
      </Box>
      {/* TODO Remove when we only show one city office through bottom sheet. */}
      <Gutter height="md" />
    </>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
