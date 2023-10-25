import {StyleSheet} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
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
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={cityOffices}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={cityOffice => cityOffice.identifier}
        ListFooterComponent={<Gutter height="lg" />}
        renderItem={({item}) => <CityOfficeButton cityOffice={item} />}
        scrollEnabled={true}
        style={styles.flatList}
      />
    </Box>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
  },
  flatList: {
    flex: 1,
  },
})
