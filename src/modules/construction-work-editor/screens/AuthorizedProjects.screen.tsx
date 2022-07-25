import {RouteProp, useRoute} from '@react-navigation/core'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Alert, Spinner} from '@/components/ui'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {useRegisterConstructionWorkEditorId} from '@/modules/construction-work-editor/hooks'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'

export const AuthorizedProjectsScreen = () => {
  const route =
    useRoute<
      RouteProp<
        RootStackParams,
        ConstructionWorkEditorRouteName.authorizedProjects
      >
    >()
  const deeplinkId = route.params?.id ?? undefined

  const {isLoading} = useRegisterConstructionWorkEditorId(deeplinkId)

  return (
    <Screen scroll={false} stickyHeader={<Alert />}>
      {isLoading ? <Spinner /> : <AuthorizedProjects />}
    </Screen>
  )
}
