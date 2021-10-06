import React from 'react'
import {size} from '../../tokens'
import {Box, Gutter, Text} from '.'

type Props = {
  children: React.ReactNode
  label: string
}

export const Preview = ({children, label}: Props) => {
  return (
    <>
      <Text secondary>{label}</Text>
      <Gutter height={size.spacing.sm} />
      <Box background="grey">{children}</Box>
    </>
  )
}
