import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {LinkToUserSection, UserSection} from '..'
import {RootStackParamList} from '../../../../app/navigation'
import {Text} from '../../../../components/ui'
import {HomeRouteName} from '../../../home/routes'
import {selectProjectManager} from '../../../projects/components/project-manager'
import {ProjectsRouteName} from '../../../projects/routes'

export const ProjectManagerUserSection = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, HomeRouteName>>()

  if (!projectManagerId) {
    return null
  }

  return (
    <UserSection title="Omgevingsmanager">
      <LinkToUserSection
        onPress={() =>
          navigation.navigate(
            'ConstructionWorkModule',
            ProjectsRouteName.authorizedProjects,
          )
        }>
        <Text large>Je bouwprojecten</Text>
      </LinkToUserSection>
    </UserSection>
  )
}
