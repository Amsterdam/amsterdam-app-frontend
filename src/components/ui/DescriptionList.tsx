import React from 'react'
import {SingleSelectable} from '@/components/ui/'
import {Column} from '@/components/ui/layout'
import {Paragraph, Phrase} from '@/components/ui/text'
import {accessibleText} from '@/utils'

type DescriptionListProps = {
  items: DescriptionListItem[]
}

export type DescriptionListItem = {
  label: string
  value?: string
}

export const DescriptionList = ({items}: DescriptionListProps) => {
  const nonEmptyItems = items.filter(item => item.value)

  return (
    <Column gutter="md">
      {nonEmptyItems.map(({label, value}) => (
        <SingleSelectable
          accessibilityLabel={accessibleText(label, value)}
          key={label}>
          <Phrase fontWeight="bold">{label}</Phrase>
          <Paragraph>{value}</Paragraph>
        </SingleSelectable>
      ))}
    </Column>
  )
}
