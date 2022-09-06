import BottomSheet from '@gorhom/bottom-sheet'
import {Title} from '_components/ui/text'
import React, {useCallback, useRef, useState} from 'react'
import {Box} from '@/components/ui'
import {Row, Screen} from '@/components/ui/layout'
import {
  CityOfficeOverview,
  ContactOptions,
  ReferToWebsiteCard,
} from '@/modules/contact/components'

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
          enablePanDownToClose
          index={-1}
          onChange={updateBottomSheetState}
          ref={bottomSheetRef}
          snapPoints={['50%']}>
          <Box>
            <Row align="center">
              <Title text="💩" />
            </Row>
          </Box>
        </BottomSheet>
      }>
      <ContactOptions />
      <CityOfficeOverview toggleBottomSheet={toggleBottomSheet} />
      <ReferToWebsiteCard />
    </Screen>
  )
}
