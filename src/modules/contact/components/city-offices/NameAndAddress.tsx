import React, {SVGProps} from 'react'
import {CityOffice as CityOfficeIcon} from '@/assets/icons'
import {SingleSelectable} from '@/components/ui'
import {Column, Gutter, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Article, Phrase, Title} from '@/components/ui/text'
import {CityOffice} from '@/modules/contact/types'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = Pick<CityOffice, 'title' | 'address' | 'addressContent'>

export const NameAndAddress = ({title, address, addressContent}: Props) => {
  const iconProps = useThemable(createIconProps)

  return (
    <Column gutter="md">
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
      {!!addressContent && (
        <>
          <Title level="h5" text={addressContent.title} />
          <Article content={addressContent.html} />
        </>
      )}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
