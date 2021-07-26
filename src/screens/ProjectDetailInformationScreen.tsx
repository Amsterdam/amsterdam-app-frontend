import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {ScrollView} from 'react-native'
import {RootStackParamList} from '../../App'
import {Box, ScreenWrapper, Section, Text, Title} from '../components/ui'

type ProjectDetailInformationScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProjectDetailInformation'
>

type Props = {
  route: ProjectDetailInformationScreenRouteProp
}

export const ProjectDetailInformationScreen = ({route}: Props) => {
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
          <Title text="Informatie" />
        </Box>
        <Box>
          <Text margin>({project.title})</Text>
          {project.intro?.title && (
            <Title level={2} text={project.intro.title} />
          )}
          <Section
            title={project.intro?.title || 'Introductie'}
            text={project.intro?.text}
          />
          {project.intro?.link && (
            <Text margin>
              {project.intro.linkText}: {project.intro.link}
            </Text>
          )}
          <Section title="Wat gaat er gebeuren" text={project.body?.what} />
          <Section title="Waar" text={project.body?.where} />
        </Box>
      </ScrollView>
    </ScreenWrapper>
  )
}
