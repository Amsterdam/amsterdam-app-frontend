import {RouteProp} from '@react-navigation/core'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Alert} from '@/components/ui'
import {PleaseWait} from '@/components/ui/feedback'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {useRegisterConstructionWorkEditorId} from '@/modules/construction-work-editor/hooks'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {setAlert} from '@/store'
import {Variant} from '@/types'

type Props = {
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.authorizedProjects
  >
}

export const AuthorizedProjectsScreen = ({route}: Props) => {
  const dispatch = useDispatch()
  const deeplinkId = route.params?.id ?? undefined

  useEffect(() => {
    if (route.params?.showSuccesfullySendMessageAlert) {
      dispatch(
        setAlert({
          content: {
            title: 'Gelukt',
            text: 'Uw bericht is geplaatst.',
          },
          variant: Variant.success,
          isVisible: true,
        }),
      )
    }
  }, [dispatch, route.params?.showSuccesfullySendMessageAlert])

  const {isLoading} = useRegisterConstructionWorkEditorId(deeplinkId)

  return (
    <Screen scroll={false} stickyHeader={<Alert />}>
      {isLoading ? <PleaseWait /> : <AuthorizedProjects />}
    </Screen>
  )
}
