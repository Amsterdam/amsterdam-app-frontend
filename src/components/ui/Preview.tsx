import React from 'react'
import {size} from '../../tokens'
import {Gutter} from './layout'
import {Box, Text} from './'

type Props = {
  children: React.ReactNode
  label: string
}

export const Preview = ({children, label}: Props) => {
  return (
    <>
      <Text>{label}</Text>
      <Gutter height={size.spacing.sm} />
      <Box background="grey">{children}</Box>
    </>
  )
}
