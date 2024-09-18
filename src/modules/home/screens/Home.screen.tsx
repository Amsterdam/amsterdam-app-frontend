import {multiply} from 'react-native-salesforce-messaging-in-app'
import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {Tip} from '@/components/features/product-tour/types'
import {Screen} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useModules} from '@/hooks/useModules'
import {Modules} from '@/modules/home/components/Modules'
import {devLog} from '@/processes/development'
import {selectIsInternetReachable} from '@/store/slices/internetConnection'

export const HomeScreen = () => {
  const {enabledModules, modulesError, modulesLoading, refetchModules} =
    useModules()
  const {isPortrait} = useDeviceContext()

  const isInternetReachable = useSelector(selectIsInternetReachable)

  void multiply(2, 4).then(res => devLog('multiply', res))

  if (modulesLoading) {
    return <PleaseWait testID="HomeLoadingSpinner" />
  }

  if (modulesError || !enabledModules) {
    if (isInternetReachable === false) {
      return <NoInternetErrorFullScreen />
    }

    return (
      <Screen
        testID="HomeErrorScreen"
        trackScroll={[Tip.cityPassShowPassesButton]}
        withBottomInset
        withLeftInset={isPortrait}
        withRightInset={isPortrait}>
        <FullScreenError
          buttonAccessibilityLabel="Laad de modules opnieuw"
          buttonLabel="Laad opnieuw"
          error={modulesError}
          Image={ModulesFigure}
          onPress={refetchModules}
          testID="HomeErrorScreen"
          text="Probeer het later opnieuw."
          title="Helaas kunnen de modules niet geladen worden"
        />
      </Screen>
    )
  }

  return (
    <Screen testID="HomeScreen">
      <Modules modules={enabledModules} />
    </Screen>
  )
}
