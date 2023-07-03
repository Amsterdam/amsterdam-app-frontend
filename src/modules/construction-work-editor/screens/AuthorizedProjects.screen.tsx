import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Alert} from '@/components/ui/feedback'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Screen} from '@/components/ui/layout'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {setAlert} from '@/store/slices/alert'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.authorizedProjects
  >
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.authorizedProjects
  >
}

export const AuthorizedProjectsScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const deeplinkId = route.params?.id ?? undefined

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
      navigation.setParams({showSuccessfullySentMessageAlert: false})
    }
  }, [dispatch, navigation, route.params?.showSuccessfullySentMessageAlert])

  return (
    <Screen
      scroll={false}
      stickyHeader={<Alert />}>
      <AuthorizedProjects deeplinkId={deeplinkId} />
    </Screen>
  )
}
