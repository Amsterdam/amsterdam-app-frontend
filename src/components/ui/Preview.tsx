import React, {ReactNode} from 'react'
import {View} from 'react-native'
import {Box, Text} from '@/components/ui/'
import {Column} from '@/components/ui/layout'

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
        <Box insetHorizontal="md" insetVertical="sm" background="grey">
          <Column gutter="sm">{children}</Column>
        </Box>
      </View>
    </Column>
  )
}
