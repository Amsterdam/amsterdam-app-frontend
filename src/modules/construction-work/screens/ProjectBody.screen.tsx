import {RouteProp, useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {Box, Timeline} from '@/components/ui/containers'
import {Column, Screen} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {ProjectContacts} from '@/modules/construction-work/components/project'
import {ProjectContentSections} from '@/modules/construction-work/components/project/ProjectContentSections'
import {
  ConstructionWorkRouteName,
  ConstructionWorkStackParams,
} from '@/modules/construction-work/routes'

type ProjectBodyScreenRouteProp = RouteProp<
  ConstructionWorkStackParams,
  ConstructionWorkRouteName.projectBody
>

type Props = {
  route: ProjectBodyScreenRouteProp
}

export const ProjectBodyScreen = ({route}: Props) => {
  const {body, headerTitle} = route.params
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle,
    })
  })

  return (
    <Screen>
      <Column gutter="md">
        <Box>
          <Column gutter="md">
            <Title text={body.title} />
            {!!body.contacts && <ProjectContacts contacts={body.contacts} />}
            {!!body.sections && (
              <ProjectContentSections sections={body.sections} />
            )}
            {body.timeline?.items?.length && (
              <Timeline items={body.timeline.items} />
            )}
          </Column>
        </Box>
      </Column>
    </Screen>
  )
}
