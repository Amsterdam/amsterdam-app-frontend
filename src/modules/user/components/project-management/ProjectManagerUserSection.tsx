import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Text} from '@/components/ui'
import {module as constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {selectConstructionWorkEditorId} from '@/modules/construction-work-editor/slice'
import {module as userModule} from '@/modules/user'
import {LinkToUserSection, UserSection} from '@/modules/user/components'

export const ProjectManagerUserSection = () => {
  const projectManagerId = useSelector(selectConstructionWorkEditorId)
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  if (!projectManagerId) {
    return null
  }

  return (
    <UserSection title="Omgevingsmanager">
      <LinkToUserSection
        onPress={() =>
          navigation.navigate(constructionWorkEditorModule.slug, {
            screen: ConstructionWorkEditorRouteName.authorizedProjects,
          })
        }>
        <Text large>Je bouwprojecten</Text>
      </LinkToUserSection>
    </UserSection>
  )
}
