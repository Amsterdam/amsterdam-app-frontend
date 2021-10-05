import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import ChatBubble from '@amsterdam/asc-assets/static/icons/ChatBubble.svg'
import Info from '@amsterdam/asc-assets/static/icons/Info.svg'
import LocationFields from '@amsterdam/asc-assets/static/icons/LocationFields.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {ReactNode, useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, Timeline, Title} from '../components/ui'
import {tagsStyles} from '../styles/html'
import {color, font, size} from '../tokens'
import {regexLibrary} from '../utils'

type ProjectDetailBodyScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailBody'
>

type Props = {
  route: ProjectDetailBodyScreenRouteProp
}

export const ProjectDetailBodyScreen = ({route}: Props) => {
  const {body} = route.params
  const navigation = useNavigation()
  const {width} = useWindowDimensions()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: body.headerTitle,
    })
  })

  const icon: Record<string, ReactNode> = {
    Contact: <ChatBubble fill={color.font.primary} style={styles.icon} />,
    Informatie: <Info fill={color.font.primary} style={styles.icon} />,
    Tijdlijn: <Calendar fill={color.font.primary} style={styles.icon} />,
    Werkzaamheden: (
      <LocationFields fill={color.font.primary} style={styles.icon} />
    ),
  }

  return (
    <ScrollView>
      <View style={styles.title}>
        {icon[body.title]}
        <Title primary text={body.title} />
      </View>
      <Box>
        {body.sections.map(section => (
          <React.Fragment key={section.title}>
            <Title level={3} text={section.title} />
            <RenderHTML
              contentWidth={width}
              source={{
                html: section.html
                  .replace(
                    regexLibrary.plainPublish.regex,
                    regexLibrary.plainPublish.replace,
                  )
                  .replace(
                    regexLibrary.quotePublish.regex,
                    regexLibrary.quotePublish.replace,
                  ),
              }}
              systemFonts={[font.weight.regular, font.weight.demi]}
              tagsStyles={tagsStyles}
            />
          </React.Fragment>
        ))}
        {body.timeline?.items?.length && (
          <Timeline items={body.timeline.items} />
        )}
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: font.height.h1,
    marginRight: size.spacing.md,
  },
  title: {
    flexDirection: 'row',
    padding: size.spacing.md,
    backgroundColor: color.background.light,
    borderBottomWidth: 1,
    borderBottomColor: color.border.boxLight,
  },
})
