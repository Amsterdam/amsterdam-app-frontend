import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import React, {SVGProps} from 'react'
import {useDispatch} from 'react-redux'
import {CityOffice as CityOfficeIcon} from '@/assets/icons'
import {SingleSelectable} from '@/components/ui'
import {IconWithTitleButton} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {CityOffice} from '@/modules/contact/types'
import {toggleBottomSheet} from '@/store'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = Pick<CityOffice, 'address' | 'addressContent' | 'title'>

export const NameAndAddress = ({address, addressContent, title}: Props) => {
  const dispatch = useDispatch()
  const iconProps = useThemable(createIconProps)

  return (
    <Column gutter="md">
      <IconWithTitleButton
        icon={<CityOfficeIcon {...iconProps} />}
        onPress={() => dispatch(toggleBottomSheet())}
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
