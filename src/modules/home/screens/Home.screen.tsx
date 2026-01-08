import {NoInternetErrorFullScreen} from '@/components/features/NoInternetFullScreenError'
import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {FullScreenError} from '@/components/ui/feedback/error/FullScreenError'
import {ModulesFigure} from '@/components/ui/media/errors/ModulesFigure'
import {useSelector} from '@/hooks/redux/useSelector'
import {useDeviceContext} from '@/hooks/useDeviceContext'
import {useModules} from '@/hooks/useModules'
import {ActionButtons} from '@/modules/home/components/ActionButtons'
import {Modules} from '@/modules/home/components/Modules'
import {useGetModulesBottomsheetVariants} from '@/modules/home/hooks/useGetModulesBottomsheetVariants'
import {selectIsInternetReachable} from '@/store/slices/internetConnection'

export const HomeScreen = () => {
  const {enabledModules, modulesError, modulesLoading, refetchModules} =
    useModules()
  const {isPortrait} = useDeviceContext()

  const isInternetReachable = useSelector(selectIsInternetReachable)

  const variantMap = useGetModulesBottomsheetVariants()

  if (modulesLoading) {
    return <PleaseWait testID="HomeLoadingSpinner" />
  }

  if (modulesError || !enabledModules) {
    if (isInternetReachable === false) {
      return <NoInternetErrorFullScreen TopComponent={<ActionButtons />} />
    }

    return (
      <Screen
        testID="HomeErrorScreen"
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
    <Screen
      bottomSheet={
        <BottomSheet
          testID="HomeBottomSheet"
          variants={variantMap}
        />
      }
      hasStickyAlert
      headerOptions={{
        disableHorizontalInsets: true,
      }}
      testID="HomeScreen">
      <Box grow>
        <ActionButtons />
        <Modules modules={enabledModules} />
      </Box>
    </Screen>
  )
}
