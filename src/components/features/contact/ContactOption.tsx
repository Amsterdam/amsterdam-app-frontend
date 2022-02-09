import React, {ReactNode} from 'react'
import {StyleSheet, View} from 'react-native'
import {Box, Text, Title} from '../../ui'
import {Row} from '../../ui/layout'

type Props = {
  icon: ReactNode
  title: string
  text: string
}

export const ContactOption = ({icon, title, text}: Props) => (
  <Box background="grey">
    <Row gutter="md">
      <View style={styles.icon}>{icon}</View>
      <View>
        <Title level={4} text={title} />
        <Text>{text}</Text>
      </View>
    </Row>
  </Box>
)

const styles = StyleSheet.create({
  icon: {
    width: 36,
    aspectRatio: 1,
  },
})
