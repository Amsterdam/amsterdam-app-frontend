import React from 'react'
import {StyleSheet, View} from 'react-native'
import Pushberichten from '../../../assets/images/best-wishes-21/pushberichten.svg'
import Toegankelijkheid from '../../../assets/images/best-wishes-21/toegankelijkheid.svg'
import {size} from '../../../tokens'
import {Image, Text, Title} from '../../ui'
import {Row} from '../../ui/layout'

export type SectionProps = {
  title?: string
  icon?: 'pushberichten' | 'toegankelijkheid'
  image?: {
    file: any
    aspectRatio?: number
  }
  body: string[]
}

export const Section = ({body, icon, image, title}: SectionProps) => {
  const icons = {
    pushberichten: Pushberichten,
    toegankelijkheid: Toegankelijkheid,
  }
  const Icon = icon && icons[icon]

  return (
    <View>
      {image && (
        <Row align="center">
          <Image
            source={image.file}
            style={[styles.figure, {aspectRatio: image.aspectRatio}]}
          />
        </Row>
      )}
      {icon && <Icon style={styles.figure} />}
      {title && <Title level={4} text={title} />}
      {body.map((text, index) => (
        <Text key={index} margin={index < body.length - 1}>
          {text}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  figure: {
    flex: 1,
    marginBottom: size.spacing.md,
  },
})
