import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import React, {SVGProps} from 'react'
import {CityOffice as CityOfficeIcon} from '@/assets/icons'
import {SingleSelectable} from '@/components/ui'
import {IconWithTitleButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {CityOffice} from '@/modules/contact/types'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  toggleBottomSheet: () => void
} & Pick<CityOffice, 'title' | 'address' | 'addressContent'>

export const NameAndAddress = ({
  title,
  address,
  addressContent,
  toggleBottomSheet,
}: Props) => {
  const iconProps = useThemable(createIconProps)

  return (
    <Column gutter="md">
      <IconWithTitleButton
        icon={<CityOfficeIcon {...iconProps} />}
        onPress={toggleBottomSheet}
        text={
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
        }
        title={title}
        titleIcon={<ChevronDown {...iconProps} />}
      />
      {!!addressContent && (
        <>
          <Title level="h5" text={addressContent.title} />
          {/* TODO Make this either HTML or text in our database. */}
          <Paragraph>{addressContent.html}</Paragraph>
        </>
      )}
    </Column>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
