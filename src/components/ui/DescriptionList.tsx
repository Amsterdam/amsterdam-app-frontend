import React from 'react'
import {Gutter} from './layout'
import {SingleSelectable, Text} from './'

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
    <>
      {nonEmptyItems.map(({label, value}, index) => (
        <SingleSelectable key={label}>
          <Text secondary small>
            {label}
          </Text>
          <Text>{value}</Text>
          {index < nonEmptyItems.length - 1 && <Gutter height="md" />}
        </SingleSelectable>
      ))}
    </>
  )
}
