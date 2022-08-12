import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Screen} from '@/components/ui/layout'
import {WritingGuide} from '@/modules/construction-work-editor/components'
import {ConstructionWorkEditorModalName} from '@/modules/construction-work-editor/routes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorModalName.writingGuide
  >
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorModalName.writingGuide
  >
}

export const WritingGuideScreen = ({navigation, route}: Props) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.projectTitle,
    })
  }, [navigation, route.params.projectTitle])

  return (
    <Screen>
      <WritingGuide />
    </Screen>
  )
}
