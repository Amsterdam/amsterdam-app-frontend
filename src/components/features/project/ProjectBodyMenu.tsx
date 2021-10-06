import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {RootStackParamList, routes} from '../../../../App'
import {color, size} from '../../../tokens'
import {ProjectDetail, Section, Timeline} from '../../../types'
import {IconButton} from '../../ui'

type Props = {
  project: ProjectDetail
}

export const ProjectBodyMenu = ({project}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, 'ProjectDetailBody'>
    >()

  const menu: {
    icon: any
    sections?: Section[]
    timeline?: Timeline
    title: string
  }[] = [
    {
      icon: <Info fill={color.font.inverse} />,
      sections: [
        ...(project.body.intro ?? []),
        ...(project.body.what ?? []),
        ...(project.body.where ?? []),
      ],
      title: 'Informatie',
    },
    {
      icon: <Calendar fill={color.font.inverse} />,
      sections: project.body.when ?? [],
      timeline: project.body.timeline,
      title: 'Tijdlijn',
    },
    {
      icon: <LocationFields fill={color.font.inverse} />,
      sections: project.body.work,
      title: 'Werkzaamheden',
    },
    {
      icon: <ChatBubble fill={color.font.inverse} />,
      sections: project.body.contact,
      title: 'Contact',
    },
  ]

  return (
    <View style={styles.row}>
      {menu?.map(({icon, sections, timeline, title}) => {
        const hasSections = sections?.length
        const hasTimeline = Object.keys(timeline ?? {}).length

        return hasSections || hasTimeline ? (
          <IconButton
            icon={icon}
            key={title}
            label={title.replace('Werkzaamheden', 'Werkzaam-heden')}
            onPress={() =>
              navigation.navigate(routes.projectDetailBody.name, {
                body: {
                  headerTitle: project.title,
                  sections: sections ?? [],
                  title: title,
                  timeline: timeline,
                },
              })
            }
          />
        ) : null
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -size.spacing.md,
  },
})
