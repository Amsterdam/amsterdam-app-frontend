import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {Column} from './layout'
import {Box, Text} from './'

type Props = {
  children: ReactNode
  image?: ReactNode
  label: string
}

export const Preview = ({children, image, label}: Props) => {
  return (
    <Column gutter="sm">
      <Text>{label}</Text>
      <View>
        {image}
        <Box background="grey">
          <Column gutter="sm">{children}</Column>
        </Box>
      </View>
    </Column>
  )
}
