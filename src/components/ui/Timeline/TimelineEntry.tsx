import Checkmark from '@amsterdam/asc-assets/static/icons/Checkmark.svg'
import ChevronDown from '@amsterdam/asc-assets/static/icons/ChevronDown.svg'
import ChevronUp from '@amsterdam/asc-assets/static/icons/ChevronUp.svg'
import React, {useState} from 'react'
import {useWindowDimensions} from 'react-native'
import {StyleSheet, View} from 'react-native'
import {TouchableWithoutFeedback} from 'react-native-gesture-handler'
import RenderHTML from 'react-native-render-html'
import {TimeLineItem} from '../../../data/timeline'
import {tagsStyles} from '../../../styles/html'
import {color, font, size} from '../../../tokens'
import {Title} from '../Title'

type Props = {
  item: TimeLineItem
  firstItem?: boolean
  lastItem?: boolean
}

export const TimelineItem = ({item, firstItem, lastItem}: Props) => {
  const {width} = useWindowDimensions()
  const isCurrent = item.status === 'current'
  const [expanded, setExpanded] = useState(isCurrent)

  const styles = StyleSheet.create({
    content: {
      marginLeft: STYLE.INDICATOR.SIZE.WIDTH + STYLE.SPACE_BEFORE,
    },
    indicator: {
      width: STYLE.INDICATOR.SIZE.WIDTH,
      height: STYLE.INDICATOR.SIZE.HEIGHT,
      backgroundColor: isCurrent
        ? STYLE.INDICATOR.BACKGROUND.ACTIVE
        : STYLE.INDICATOR.BACKGROUND.INACTIVE,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    line: {
      position: 'absolute',
      top: firstItem ? STYLE.INDICATOR.SPACE_AROUND.TOP : 0,
      left: expanded
        ? STYLE.SPACE_BEFORE +
          STYLE.INDICATOR.SIZE.WIDTH / 2 -
          STYLE.LINE.WIDTH / 2
        : STYLE.INDICATOR.SIZE.WIDTH / 2 - STYLE.LINE.WIDTH / 2,
      width: STYLE.LINE.WIDTH,
      height: lastItem ? STYLE.INDICATOR.SPACE_AROUND.TOP : '200%',
      backgroundColor: STYLE.LINE.COLOR,
      zIndex: -1,
    },
    section: {
      paddingVertical: STYLE.INDICATOR.SPACE_AROUND.TOP,
      marginHorizontal: expanded ? -STYLE.SPACE_BEFORE : undefined,
      paddingHorizontal: expanded ? STYLE.SPACE_BEFORE : undefined,
      backgroundColor: expanded ? STYLE.SECTION.BACKGROUND.ACTIVE : undefined,
      overflow: 'hidden',
    },
    title: {
      marginLeft: size.spacing.md,
      marginRight: size.spacing.xs,
    },
  })

  return (
    <View style={styles.section}>
      <TouchableWithoutFeedback
        onPress={() => setExpanded(!expanded)}
        style={styles.heading}>
        <View style={styles.indicator}>
          {item.status === 'finished' && (
            <Checkmark fill={color.background.light} height={11} width={14} />
          )}
        </View>
        <View style={styles.title}>
          <Title level={4} margin text={item.title} />
        </View>
        {expanded ? (
          <ChevronUp fill={color.background.darker} height={9} width={14} />
        ) : (
          <ChevronDown fill={color.background.darker} height={9} width={14} />
        )}
      </TouchableWithoutFeedback>
      {expanded && (
        <View style={styles.content}>
          <RenderHTML
            contentWidth={width}
            source={{html: item.content}}
            systemFonts={[font.weight.regular]}
            tagsStyles={tagsStyles}
          />
        </View>
      )}
      <View style={styles.line} />
    </View>
  )
}

const STYLE = {
  INDICATOR: {
    SPACE_AROUND: {
      TOP: size.spacing.sm,
      BOTTOM: size.spacing.sm,
    },
    SIZE: {
      HEIGHT: size.spacing.lg,
      WIDTH: size.spacing.lg,
    },
    BACKGROUND: {
      ACTIVE: color.background.emphasis,
      INACTIVE: color.background.inactive,
    },
  },
  LINE: {
    COLOR: color.background.inactive,
    WIDTH: 2,
  },
  SECTION: {
    BACKGROUND: {
      ACTIVE: color.background.light,
    },
  },
  SPACE_BEFORE: size.spacing.md,
}
