import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import React from 'react'
import {Screen} from '@/components/ui/layout'
import {
  CityOffice,
  ContactOptions,
  SelectCityOffice,
} from '@/modules/contact/components'
import {useBottomSheet} from '@/modules/contact/hooks'

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
)

export const ContactScreen = () => {
  const {onChange, ref, toggle} = useBottomSheet()

  return (
    <Screen
      stickyFooter={
        <BottomSheet
          {...{onChange, ref}}
          backdropComponent={Backdrop}
          enablePanDownToClose
          index={-1}
          snapPoints={['87.5%']}>
          <SelectCityOffice toggleBottomSheet={toggle} />
        </BottomSheet>
      }>
      <ContactOptions />
      <CityOffice toggleBottomSheet={toggle} />
    </Screen>
  )
}
