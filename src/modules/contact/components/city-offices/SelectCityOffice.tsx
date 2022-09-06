import React from 'react'
import {FlatList} from 'react-native'
import {Box} from '@/components/ui'
import {Gutter} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {CityOfficeButton} from '@/modules/contact/components'
import {cityOffices} from '@/modules/contact/data'

type Props = {
  toggleBottomSheet: () => void
}

const renderGutter = () => <Gutter height="sm" />

export const SelectCityOffice = ({toggleBottomSheet}: Props) => {
  return (
    <Box grow>
      <Title level="h3" text="Stadsloketten" />
      <Gutter height="md" />
      <FlatList
        data={cityOffices}
        ItemSeparatorComponent={renderGutter}
        keyExtractor={i => i.identifier}
        renderItem={({item}) => (
          <CityOfficeButton
            cityOffice={item}
            toggleBottomSheet={toggleBottomSheet}
          />
        )}
      />
    </Box>
  )
}
