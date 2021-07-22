import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Title} from '../components/ui'

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: project.title,
    })
  })

  return (
    <ScreenWrapper>
      <ScrollView>
        <Box background="lighter">
          <Title text="Tijdlijn" />
        </Box>
        <Box>
          <Section title="Wanneer" text={project.body?.when} />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}
