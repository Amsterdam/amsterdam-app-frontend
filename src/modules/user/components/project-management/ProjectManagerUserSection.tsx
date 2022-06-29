import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {LinkToUserSection, UserSection} from '..'
import {module as userModule} from '../..'
import {RootStackParamList} from '../../../../app/navigation'
import {Text} from '../../../../components/ui'
import {module as constructionWorkModule} from '../../../construction-work'
import {selectProjectManager} from '../../../construction-work/components/project-manager'
import {ConstructionWorkRouteName} from '../../../construction-work/routes'

export const ProjectManagerUserSection = () => {
  const {id: projectManagerId} = useSelector(selectProjectManager)
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof userModule.slug>
    >()

  if (!projectManagerId) {
    return null
  }

  return (
    <UserSection title="Omgevingsmanager">
      <LinkToUserSection
        onPress={() =>
          navigation.navigate(constructionWorkModule.slug, {
            screen: ConstructionWorkRouteName.authorizedProjects,
          })
        }>
        <Text large>Je bouwprojecten</Text>
      </LinkToUserSection>
    </UserSection>
  )
}
