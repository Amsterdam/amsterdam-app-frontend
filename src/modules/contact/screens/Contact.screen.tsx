import BottomSheet from '@gorhom/bottom-sheet'
import React, {useCallback, useRef, useState} from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui'
import {Gutter, Screen} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {
  CityOffice,
  CityOfficeButton,
  ContactOptions,
  ReferToWebsiteCard,
} from '@/modules/contact/components'
import {cityOffices} from '@/modules/contact/data'

const gutter = () => <Gutter height="sm" />

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
          snapPoints={['87.5%']}>
          <Box grow>
            <Title level="h3" text="Stadsloketten" />
            <Gutter height="md" />
            <FlatList
              data={cityOffices}
              ItemSeparatorComponent={gutter}
              keyExtractor={i => i.identifier}
              renderItem={({item}) => <CityOfficeButton cityOffice={item} />}
            />
          </Box>
        </BottomSheet>
      }>
      <ContactOptions />
      <CityOffice toggleBottomSheet={toggleBottomSheet} />
      <ReferToWebsiteCard />
    </Screen>
  )
}
