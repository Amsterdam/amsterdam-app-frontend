import React from 'react'
import {ImageSourcePropType, StyleSheet, TouchableHighlight} from 'react-native'
import {image} from '../../tokens'
import {Card, CardBody, Image, SingleSelectable, Title} from '../ui'

type Props = {
  border?: boolean
  imageSource?: ImageSourcePropType
  onPress: () => void
  title: string
  subtitle: string
}

export const BannerCard = ({
  border,
  imageSource,
  onPress,
  subtitle,
  title,
}: Props) => (
  <>
    {/* Allow this card to be included in navigation by titles. */}
    <Title text={title} visuallyHidden />
    <TouchableHighlight accessibilityRole="button" onPress={onPress}>
      <Card border={border}>
        {imageSource && <Image source={imageSource} style={styles.image} />}
        <CardBody>
          {/* Skip re-reading main title */}
          <SingleSelectable label={subtitle}>
            <Title level={3} text={title} />
            <Title level={3} subtitle text={subtitle} />
          </SingleSelectable>
        </CardBody>
      </Card>
    </TouchableHighlight>
  </>
)

const styles = StyleSheet.create({
  image: {
    aspectRatio: image.aspectRatio.default,
    height: undefined,
    maxWidth: '100%',
    resizeMode: 'cover',
    width: undefined,
  },
})
