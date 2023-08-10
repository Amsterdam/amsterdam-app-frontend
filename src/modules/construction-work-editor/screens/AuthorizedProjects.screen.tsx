import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {NavigationProps} from '@/app/navigation/types'
import {Alert} from '@/components/ui/feedback/Alert'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Screen} from '@/components/ui/layout/Screen'
import {AuthorizedProjects} from '@/modules/construction-work-editor/components/AuthorizedProjects'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {setAlert} from '@/store/slices/alert'

type Props = NavigationProps<ConstructionWorkEditorRouteName.authorizedProjects>

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
