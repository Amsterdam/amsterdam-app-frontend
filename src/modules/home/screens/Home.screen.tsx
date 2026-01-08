import {BottomSheet} from '@/components/features/bottom-sheet/BottomSheet'
import {Screen} from '@/components/features/screen/Screen'
import {Home} from '@/modules/home/components/Home'
import {useGetModulesBottomsheetVariants} from '@/modules/home/hooks/useGetModulesBottomsheetVariants'

export const HomeScreen = () => {
  const variantMap = useGetModulesBottomsheetVariants()

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
      <Home />
    </Screen>
  )
}
