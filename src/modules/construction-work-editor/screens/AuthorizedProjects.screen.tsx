import {RouteProp} from '@react-navigation/core'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Alert, PleaseWait} from '@/components/ui/feedback'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {useRegisterConstructionWorkEditorId} from '@/modules/construction-work-editor/hooks'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {setAlert} from '@/store'

type Props = {
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.authorizedProjects
  >
}

export const AuthorizedProjectsScreen = ({route}: Props) => {
  const dispatch = useDispatch()
  const deeplinkId = route.params?.id ?? undefined

  const {isLoading} = useRegisterConstructionWorkEditorId(deeplinkId)

  useEffect(() => {
    if (route.params?.showSuccessfullySentMessageAlert) {
      dispatch(
        setAlert({
          closeType: AlertCloseType.withoutButton,
          content: {
            title: 'Gelukt',
            text: 'Uw bericht is geplaatst.',
          },
          variant: AlertVariant.positive,
          withIcon: false,
        }),
      )
    }
  }, [dispatch, route.params?.showSuccessfullySentMessageAlert])

  return (
    <Screen scroll={false} stickyHeader={<Alert />}>
      {isLoading ? <PleaseWait /> : <AuthorizedProjects />}
    </Screen>
  )
}
