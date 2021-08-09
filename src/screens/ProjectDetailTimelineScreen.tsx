import Calendar from '@amsterdam/asc-assets/static/icons/Calendar.svg'
import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView, StyleSheet, useWindowDimensions, View} from 'react-native'
import {RenderHTML} from 'react-native-render-html'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Text, Title} from '../components/ui'
import {Timeline} from '../components/ui/Timeline/Timeline'
import {timeline} from '../data/timeline'
import {tagsStyles} from '../styles/html'
import {color, font, size} from '../tokens'

type ProjectDetailTimelineScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailTimeline'
>

type Props = {
  route: ProjectDetailTimelineScreenRouteProp
}

export const ProjectDetailTimelineScreen = ({route}: Props) => {
  const {project} = route.params
  const navigation = useNavigation()
  const {width} = useWindowDimensions()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.title,
    })
  })

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <View style={styles.row}>
            <Calendar fill={color.font.primary} style={styles.icon} />
            <Title primary text="Tijdlijn" />
          </View>
        </Box>
        <Box background="lighter">
          <Title level={4} margin text="Wanneer" />
          <Text>{timeline.intro}</Text>
          <Timeline timeline={timeline} />
        </Box>
        <Box>
          {project.body.when ? (
            <>
              <Title level={4} margin text={project.body.when.title} />
              <RenderHTML
                contentWidth={width}
                source={{html: project.body.when.text}}
                systemFonts={[font.weight.regular, font.weight.demi]}
                tagsStyles={tagsStyles}
              />
            </>
          ) : (
            <Text>Geen informatie gevonden.</Text>
          )}
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: font.height.h1,
    marginRight: size.spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
})
