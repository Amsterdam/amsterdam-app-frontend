import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import React, {useCallback, useRef, useState} from 'react'
import {Screen} from '@/components/ui/layout'
import {
  CityOffice,
  ContactOptions,
  SelectCityOffice,
} from '@/modules/contact/components'

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
)

export const ContactScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const toggleBottomSheet = useCallback(() => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.close()
    } else {
      bottomSheetRef.current?.expand()
    }
  }, [isBottomSheetOpen])

  const updateBottomSheetState = useCallback((index: number) => {
    setIsBottomSheetOpen(index === 0)
  }, [])

  return (
    <Screen
      stickyFooter={
        <BottomSheet
          backdropComponent={renderBackdrop}
          enablePanDownToClose
          index={-1}
          onChange={updateBottomSheetState}
          ref={bottomSheetRef}
          snapPoints={['87.5%']}>
          <SelectCityOffice toggleBottomSheet={toggleBottomSheet} />
        </BottomSheet>
      }>
      <ContactOptions />
      <CityOffice toggleBottomSheet={toggleBottomSheet} />
    </Screen>
  )
}
