import React from 'react'
import {ImageSourcePropType, TouchableHighlight} from 'react-native'
import {Card, CardBody, SingleSelectable, Title} from '../ui'
import {Image} from '../ui/media'

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
        {imageSource && <Image source={imageSource} />}
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
