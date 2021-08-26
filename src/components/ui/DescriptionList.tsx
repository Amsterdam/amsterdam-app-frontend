import React from 'react'
import {size} from '../../tokens'
import {Gutter} from './Gutter'
import {Text} from './Text'

type DescriptionListProps = {
  items: DescriptionListItem[]
}

export type DescriptionListItem = {
  label: string
  value?: string
}

export const DescriptionList = ({items}: DescriptionListProps) => (
  <>
    {items
      .filter(item => item.value)
      .map(({label, value}, index) => (
        <React.Fragment key={label}>
          <Text secondary small>
            {label}
          </Text>
          <Text>{value}</Text>
          {index < items.length - 1 && <Gutter height={size.spacing.md} />}
        </React.Fragment>
      ))}
  </>
)
