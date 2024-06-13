import {Screen} from '@/components/features/screen/Screen'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/layout/FullScreenError'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useModules} from '@/hooks/useModules'
import {Modules} from '@/modules/home/components/Modules'

export const HomeScreen = () => {
  const {modulesError, modulesLoading, refetchModules} = useModules()
  const {isPortrait} = useDeviceContext()

  if (modulesLoading) {
    return <PleaseWait testID="HomeLoadingSpinner" />
  }

  if (modulesError) {
    return (
      <Screen
        testID="HomeErrorScreen"
        withLeftInset={isPortrait}
        withRightInset={isPortrait}>
        <FullScreenError
          buttonAccessibilityLabel="Laad de modules opnieuw"
          buttonLabel="Laad opnieuw"
          error={modulesError}
          Image={ModulesFigure}
          onPress={refetchModules}
          testProps={{
            testID: 'HomeErrorScreen',
          }}
          text="Probeer het later opnieuw."
          title="Helaas kunnen de modules niet geladen worden"
        />
      </Screen>
    )
  }

  return (
    <Screen testID="HomeScreen">
      <Modules />
    </Screen>
  )
}
