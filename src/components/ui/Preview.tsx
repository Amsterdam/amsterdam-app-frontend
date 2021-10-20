import React from 'react'
import {Column} from './layout'
import {Box, Text} from './'

type Props = {
  children: React.ReactNode
  label: string
}

export const Preview = ({children, label}: Props) => {
  return (
    <Column gutter="sm">
      <Text>{label}</Text>
      <Box background="grey">
        <Column gutter="sm">{children}</Column>
      </Box>
    </Column>
  )
}
