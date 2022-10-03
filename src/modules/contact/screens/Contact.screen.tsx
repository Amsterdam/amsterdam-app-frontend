import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import React, {useContext} from 'react'
import {StyleSheet} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {Screen} from '@/components/ui/layout'
import {
  CityOffice,
  ContactOptions,
  SelectCityOffice,
} from '@/modules/contact/components'
import {useBottomSheet} from '@/modules/contact/hooks'
import {Device, DeviceContext} from '@/providers'

const Backdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
)

export const ContactScreen = () => {
  const {onChange, ref} = useBottomSheet()
  const insets = useSafeAreaInsets()
  const {isLandscape} = useContext(DeviceContext)
  const styles = createStyles(insets, isLandscape)

  return (
    <Screen
      stickyFooter={
        <BottomSheet
          {...{onChange, ref}}
          backdropComponent={Backdrop}
          enablePanDownToClose
          index={-1}
          snapPoints={['87.5%']}
          style={styles.safeAreaInsets}>
          <SelectCityOffice />
        </BottomSheet>
      }>
      <ContactOptions />
      <CityOffice />
    </Screen>
  )
}

const createStyles = (insets: EdgeInsets, isLandscape: Device['isLandscape']) =>
  StyleSheet.create({
    safeAreaInsets: {
      paddingLeft: isLandscape ? insets.left : undefined,
      paddingRight: isLandscape ? insets.right : undefined,
    },
  })
