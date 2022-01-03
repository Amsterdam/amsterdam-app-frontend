import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {useNavigation} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {menuRoutes, MenuStackParams} from '../../../App/navigation'
import {DeviceContext} from '../../../providers'
import {color, size} from '../../../tokens'
import {ProjectDetail, Section, Timeline} from '../../../types'
import {IconButton} from '../../ui'

type Props = {
  project: ProjectDetail
}

type ProjectBodyMenuItem = {
  icon: React.ReactElement
  sections?: Section[]
  timeline?: Timeline
  title: string
}

export const ProjectBodyMenu = ({project}: Props) => {
  const deviceContext = useContext(DeviceContext)
  const navigation =
    useNavigation<StackNavigationProp<MenuStackParams, 'ProjectDetailBody'>>()

  const menuOptions: ProjectBodyMenuItem[] = [
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

  const menu: ProjectBodyMenuItem[] = menuOptions.filter(item => {
    const numberOfSections = item.sections?.length ?? 0
    const numberOfTimelines = Object.keys(item.timeline ?? {}).length ? 1 : 0

    return numberOfSections || numberOfTimelines
  })

  // Reserve 25% for each icon, space between, max half width of wide screens.
  const iconButtonWidth = 80
  const numberOfIconButtons = 4
  let rowWidth = (100 / numberOfIconButtons) * menu.length
  if (deviceContext.width > 2 * numberOfIconButtons * iconButtonWidth) {
    rowWidth /= 2
  }

  return (
    <View
      style={[
        styles.row,
        {width: rowWidth + '%'},
        deviceContext.width < numberOfIconButtons * iconButtonWidth &&
          styles.wrap,
      ]}>
      {menu.map(({icon, sections, timeline, title}) => (
        <IconButton
          icon={icon}
          key={title}
          label={title.replace('Werkzaamheden', 'Werkzaam-heden')}
          onPress={() =>
            navigation.navigate(menuRoutes.projectDetailBody.name, {
              body: {
                headerTitle: project.title,
                sections: sections ?? [],
                title: title,
                timeline: timeline,
              },
            })
          }
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -size.spacing.md,
  },
  wrap: {
    flexWrap: 'wrap',
  },
})
