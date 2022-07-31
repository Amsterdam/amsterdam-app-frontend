import {RouteProp} from '@react-navigation/core'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Alert, PleaseWait} from '@/components/ui/feedback'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {useRegisterConstructionWorkEditorId} from '@/modules/construction-work-editor/hooks'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'

type Props = {
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.authorizedProjects
  >
}

export const AuthorizedProjectsScreen = ({route}: Props) => {
  const deeplinkId = route.params?.id ?? undefined

  const {isLoading} = useRegisterConstructionWorkEditorId(deeplinkId)

  return (
    <Screen scroll={false} stickyHeader={<Alert />}>
      {isLoading ? <PleaseWait /> : <AuthorizedProjects />}
    </Screen>
  )
}
