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
}

export const TimelineItem = ({item}: Props) => {
  const {width} = useWindowDimensions()
  const [isOpen, setIsOpen] = useState(item.status === 'current')

  const isCurrent = item.status === 'current'

  return (
    <View style={[styles.section, isOpen && styles.sectionActive]}>
      <TouchableWithoutFeedback
        onPress={() => setIsOpen(!isOpen)}
        style={styles.heading}>
        <View style={[styles.indicator, isCurrent && styles.indicatorActive]}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    marginLeft: size.spacing.lg + size.spacing.md,
  },
  indicator: {
    width: size.spacing.lg,
    height: size.spacing.lg,
    backgroundColor: color.background.inactive,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorActive: {
    backgroundColor: color.background.emphasis,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    paddingVertical: size.spacing.sm,
  },
  sectionActive: {
    marginHorizontal: -size.spacing.md,
    paddingHorizontal: size.spacing.md,
    backgroundColor: color.background.light,
  },
  title: {
    marginLeft: size.spacing.md,
    marginRight: size.spacing.xs,
  },
})
