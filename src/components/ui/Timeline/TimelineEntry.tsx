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
  const [isOpen, setIsOpen] = useState(isCurrent)

  const styles = StyleSheet.create({
    content: {
      marginLeft: size.spacing.lg + size.spacing.md,
    },
    indicator: {
      width: size.spacing.lg,
      height: size.spacing.lg,
      backgroundColor: isCurrent
        ? color.background.emphasis
        : color.background.inactive,
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
      top: firstItem ? 20 : 0,
      left: isOpen ? size.spacing.lg : size.spacing.md,
      width: 2,
      height: lastItem ? 20 : '200%',
      backgroundColor: color.background.inactive,
      zIndex: -1,
    },
    section: {
      paddingVertical: size.spacing.sm,
      marginHorizontal: isOpen ? -size.spacing.md : undefined,
      paddingHorizontal: isOpen ? size.spacing.md : undefined,
      backgroundColor: isOpen ? color.background.light : undefined,
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
        onPress={() => setIsOpen(!isOpen)}
        style={styles.heading}>
        <View style={styles.indicator}>
          {item.status === 'finished' && (
            <Checkmark fill={color.background.light} height={11} width={14} />
          )}
        </View>
        <View style={styles.title}>
          <Title level={4} margin text={item.title} />
        </View>
        {isOpen ? (
          <ChevronUp fill={color.background.darker} height={9} width={14} />
        ) : (
          <ChevronDown fill={color.background.darker} height={9} width={14} />
        )}
      </TouchableWithoutFeedback>
      {isOpen && (
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
