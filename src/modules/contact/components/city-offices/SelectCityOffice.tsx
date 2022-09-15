import {BottomSheetFlatList} from '@gorhom/bottom-sheet'
import React from 'react'
import {Box} from '@/components/ui'
import {PleaseWait} from '@/components/ui/feedback'
import {Gutter} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {CityOfficeButton} from '@/modules/contact/components'
import {useGetCityOfficesQuery} from '@/modules/contact/service'

const ItemSeparator = () => <Gutter height="sm" />

export const SelectCityOffice = () => {
  const {data: cityOffices, isLoading} = useGetCityOfficesQuery()

  if (isLoading || !cityOffices) {
    return <PleaseWait />
  }

  return (
    <Box grow>
      <Title level="h3" text="Stadsloketten" />
      <Gutter height="md" />
      <BottomSheetFlatList
        data={cityOffices}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={cityOffice => cityOffice.identifier}
        ListFooterComponent={<Gutter height="lg" />}
        renderItem={({item}) => <CityOfficeButton cityOffice={item} />}
      />
    </Box>
  )
}
