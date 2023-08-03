import {BottomSheetFlatList} from '@gorhom/bottom-sheet'
import {Box} from '@/components/ui/containers/Box'
import {PleaseWait} from '@/components/ui/feedback/PleaseWait'
import {Gutter} from '@/components/ui/layout/Gutter'
import {Title} from '@/components/ui/text/Title'
import {CityOfficeButton} from '@/modules/contact/components/city-offices/CityOfficeButton'
import {useGetCityOfficesQuery} from '@/modules/contact/service'

const ItemSeparator = () => <Gutter height="sm" />

export const SelectCityOffice = () => {
  const {data: cityOffices, isLoading} = useGetCityOfficesQuery()

  if (isLoading || !cityOffices) {
    return <PleaseWait />
  }

  return (
    <Box grow>
      <Title
        level="h3"
        text="Stadsloketten"
      />
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
