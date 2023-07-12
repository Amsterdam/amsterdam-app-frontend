import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import {HorizontalSafeArea} from '@/components/ui/containers'
import {Screen} from '@/components/ui/layout'
import {useIsReduceMotionEnabled} from '@/hooks'
import {
  CityOffice,
  ContactOptions,
  SelectCityOffice,
} from '@/modules/contact/components'
import {useBottomSheet} from '@/modules/contact/hooks'

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    {...props}
  />
)

export const ContactScreen = () => {
  const {onChange, ref} = useBottomSheet()

  const isReduceMotionEnabled = useIsReduceMotionEnabled()

  return (
    <Screen
      stickyFooter={
        <BottomSheet
          animationConfigs={
            isReduceMotionEnabled
              ? {
                  duration: 0,
                }
              : undefined
          }
          backdropComponent={Backdrop}
          enablePanDownToClose
          index={-1}
          onChange={onChange}
          ref={ref}
          snapPoints={['87.5%']}>
          <HorizontalSafeArea flex={1}>
            <SelectCityOffice />
          </HorizontalSafeArea>
        </BottomSheet>
      }
      testID="ContactScreen">
      <ContactOptions />
      <CityOffice />
    </Screen>
  )
}
