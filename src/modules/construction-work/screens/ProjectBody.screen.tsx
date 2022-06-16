import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {Box, Timeline} from '../../../components/ui'
import {Column, ScrollView} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/text'
import {ProjectContacts} from '../components/project'
import {ProjectContentSections} from '../components/project/ProjectContentSections'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

type ProjectBodyScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectBody
>

type Props = {
  route: ProjectBodyScreenRouteProp
}

export const ProjectBodyScreen = ({route}: Props) => {
  const {body, headerTitle} = route.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
    })
  })

  return (
    <ScrollView>
      <Column gutter="md">
        <></>
        <Box>
          <Column gutter="md">
            <Title text={body.title} />
            {body.contacts && <ProjectContacts contacts={body.contacts} />}
            {body.sections && (
              <ProjectContentSections sections={body.sections} />
            )}
            {body.timeline?.items?.length && (
              <Timeline items={body.timeline.items} />
            )}
          </Column>
        </Box>
      </Column>
    </ScrollView>
  )
}
