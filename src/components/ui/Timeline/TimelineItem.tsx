import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {useLayoutEffect, useRef, useState} from 'react'
import {Animated, Easing, useWindowDimensions, View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {tagsStyles} from '../../../styles/html'
import {color, font} from '../../../tokens'
import {TimelineItem as TimelineItemType} from '../../../types'
import {Title} from '../Title'
import {maxHeight, timelineStyles} from './timelineStyles'

type Props = {
  isFirst?: boolean
  isLast?: boolean
  item: TimelineItemType
}

export const TimelineItem = ({isFirst, isLast, item}: Props) => {
  const {width} = useWindowDimensions()
  const isCurrent = item.progress === 'Huidig'
  const [expanded, setExpanded] = useState(isCurrent)

  const chevronProps = {fill: color.background.darker, height: 9, width: 14}
  const fadeAnim = useRef(new Animated.Value(0)).current
  const styles = timelineStyles(isCurrent, isFirst, isLast)

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
            <Checkmark fill={color.border.default} height={11} width={14} />
          )}
        </View>
        <View style={styles.title}>
          <Title level={4} margin text={item.title.text} />
        </View>
        {expanded ? (
          <ChevronUp {...chevronProps} />
        ) : (
          <ChevronDown {...chevronProps} />
        )}
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.body, {maxHeight: fadeAnim}]}>
        <RenderHTML
          contentWidth={width}
          source={{html: item.content.html}}
          systemFonts={[font.weight.regular]}
          tagsStyles={tagsStyles}
        />
      </Animated.View>
      <View style={styles.line} />
    </View>
  )
}
