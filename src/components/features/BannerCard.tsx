import React from 'react'
import {ImageSourcePropType} from 'react-native'
import {Box, SingleSelectable, Title} from '../ui'
import {Image} from '../ui/media'
import {Pressable} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'

type Props = {
  imageSource?: ImageSourcePropType
  onPress: () => void
  title: string
  subtitle: string
}

export const BannerCard = ({imageSource, onPress, subtitle, title}: Props) => (
  <Box>
    {/* Allow this card to be included in navigation by titles. */}
    <Title text={title} visuallyHidden />
    <Pressable accessibilityRole="button" onPress={onPress}>
      <Column gutter="md">
        {imageSource && <Image source={imageSource} />}
        {/* Skip re-reading main title */}
        <SingleSelectable label={subtitle}>
          <Title level={3} text={title} />
          <Title level={3} subtitle text={subtitle} />
        </SingleSelectable>
      </Column>
    </Pressable>
  </Box>
)
