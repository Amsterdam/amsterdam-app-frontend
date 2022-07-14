import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, Easing, View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import {maxHeight, timelineStyles} from './timelineStyles'
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
  const [expanded, setExpanded] = useState(isCurrent)

  const theme = useTheme()
  const {color} = theme
  const chevronProps = {
    fill: color.box.background.black,
    height: 9,
    width: 14,
  }
  const fadeAnim = useRef(new Animated.Value(0)).current
  const styles = timelineStyles(theme, isCurrent, isFirst, isLast)

  useLayoutEffect(() => {
    if (isCurrent) {
      fadeAnim.setValue(maxHeight)
    }
  }, [fadeAnim, isCurrent])

  const toggleExpand = () => {
    if (expanded) {
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
    setExpanded(!expanded)
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
            <Icon size={16}>
              <Checkmark fill={color.border.default} />
            </Icon>
          )}
        </View>
        <View style={styles.title}>
          <Title level="h5" text={item.title} />
        </View>
        {expanded ? (
          <ChevronUp {...chevronProps} />
        ) : (
          <ChevronDown {...chevronProps} />
        )}
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.body, {maxHeight: fadeAnim}]}>
        {item.content.map(c => (
          <React.Fragment key={c.title}>
            {/* <View> is needed as long as <Title> has flexShrink */}
            <View>
              <Title level="h5" text={c.title} />
            </View>
            <Article content={c.body.html} />
          </React.Fragment>
        ))}
      </Animated.View>
      <View style={styles.line} />
    </View>
  )
}
