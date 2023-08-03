import {useDispatch} from 'react-redux'
import {Pressable} from '@/components/ui/buttons/Pressable'
import {Box} from '@/components/ui/containers/Box'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {setSelectedCityOffice} from '@/modules/contact/slice'
import {CityOffice} from '@/modules/contact/types'
import {closeBottomSheet} from '@/store/slices/bottomSheet'

type Props = {
  cityOffice: CityOffice
}

export const CityOfficeButton = ({cityOffice}: Props) => {
  const dispatch = useDispatch()

  const selectCityOffice = (identifier: CityOffice['identifier']) => {
    dispatch(setSelectedCityOffice(identifier))
    dispatch(closeBottomSheet())
  }

  return (
    <Pressable
      onPress={() => selectCityOffice(cityOffice.identifier)}
      testID={`ContactCityOffice${cityOffice.identifier}Button`}>
      <Box>
        <Row gutter="md">
          <Icon
            color="link"
            name="city-office"
            size="lg"
          />
          <Title
            color="link"
            level="h5"
            text={cityOffice.title}
          />
        </Row>
      </Box>
    </Pressable>
  )
}
