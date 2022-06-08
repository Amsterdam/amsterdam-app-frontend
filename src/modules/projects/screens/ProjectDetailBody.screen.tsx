import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {Box, NonScalingHeaderTitle, Timeline} from '../../../components/ui'
import {Column, ScrollView} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {ProjectContacts} from '../components/project'
import {ProjectContentSections} from '../components/project/ProjectContentSections'
import {ProjectsRouteName, ProjectsStackParams} from '../routes'

type ProjectDetailBodyScreenRouteProp = RouteProp<
  ProjectsStackParams,
  ProjectsRouteName.projectDetailBody
>

type Props = {
  route: ProjectDetailBodyScreenRouteProp
}

export const ProjectDetailBodyScreen = ({route}: Props) => {
  const {body} = route.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={body.title} />,
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
