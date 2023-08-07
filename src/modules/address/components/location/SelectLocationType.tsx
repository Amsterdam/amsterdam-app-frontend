import {BottomSheetFlatList} from '@gorhom/bottom-sheet'
import {useMemo} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {useNavigation} from '@/hooks/useNavigation'
import {AddressTopTaskButton} from '@/modules/address/components/location/AddressTopTaskButton'
import {LocationTopTaskButton} from '@/modules/address/components/location/LocationTopTaskButton'
import {AddressModalName} from '@/modules/address/routes'
import {useBottomSheet} from '@/store/slices/bottomSheet'

const ItemSeparator = () => <Gutter height="md" />

type LocationTypeItems = {
  Component: typeof AddressTopTaskButton | typeof LocationTopTaskButton
  key: string
  onPress: () => void
}[]

export const SelectLocationType = () => {
  const navigation = useNavigation()
  const {close} = useBottomSheet()

  const items: LocationTypeItems = useMemo(
    () => [
      // TODO: implementatie (87654)
      // {
      //   Component: LocationTopTaskButton,
      //   key: 'location',
      //   onPress: () => {
      //     close()
      //   },
      // },
      {
        Component: AddressTopTaskButton,
        key: 'address',
        onPress: () => {
          navigation.navigate(AddressModalName.addressForm)
          close()
        },
      },
    ],
    [close, navigation],
  )

  return (
    <Box grow>
      <Title
        level="h3"
        text="Locaties"
      />
      <Gutter height="md" />
      <BottomSheetFlatList
        data={items}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={({key}) => key}
        renderItem={({item: {Component, onPress}}) => (
          <Component onPress={onPress} />
        )}
      />
    </Box>
  )
}
