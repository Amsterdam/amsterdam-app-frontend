import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, Easing, View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {
  maxHeight,
  timelineStyles,
} from '@/components/ui/containers/timelineStyles'
import {Icon} from '@/components/ui/media'
import {Article, Title} from '@/components/ui/text'
import {useTheme} from '@/themes'
import {TimelineItem as TimelineItemType} from '@/types'

type Props = {
  isFirst?: boolean
  isLast?: boolean
  item: TimelineItemType
}

export const TimelineItem = ({isFirst, isLast, item}: Props) => {
  const isCurrent = !item.collapsed
  const [isExpanded, setExpanded] = useState(isCurrent)
  const iconName = isExpanded ? 'chevron-up' : 'chevron-down'

  const theme = useTheme()
  const styles = timelineStyles(theme, isCurrent, isExpanded, isFirst, isLast)
  const fadeAnim = useRef(new Animated.Value(0)).current

  useLayoutEffect(() => {
    if (isCurrent) {
      fadeAnim.setValue(maxHeight)
    }
  }, [fadeAnim, isCurrent])

  const toggleExpand = () => {
    if (isExpanded) {
      Animated.timing(fadeAnim, {
        easing: Easing.bezier(0, 1, 0, 1),
        toValue: 0,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(fadeAnim, {
        toValue: maxHeight,
        useNativeDriver: false,
      }).start()
    }
    setExpanded(!isExpanded)
  }

  return (
    <View style={styles.item}>
      <TouchableWithoutFeedback
        accessible={true}
        accessibilityRole="button"
        onPress={toggleExpand}
        style={styles.header}>
        <View style={styles.indicator}>
          {item.progress === 'Afgelopen' && (
            <Icon color="inverse" name="checkmark" size="sm" />
          )}
        </View>
        <View style={styles.title}>
          <Title
            ellipsizeMode="tail"
            numberOfLines={3}
            level="h5"
            text={item.title}
          />
        </View>
        <Icon name={iconName} size="sm" />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.body, {maxHeight: fadeAnim}]}>
        {item.content.map(c => (
          <React.Fragment key={c.title}>
            <Article content={c.body.html} />
          </React.Fragment>
        ))}
      </Animated.View>
      <View style={styles.line} />
    </View>
  )
}
