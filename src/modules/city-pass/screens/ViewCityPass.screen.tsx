import {Column} from '@/components/ui/layout/Column'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {useRoute} from '@/hooks/navigation/useRoute'
import {BarCode} from '@/modules/city-pass/components/BarCode'
import {CityPassLoginBoundaryScreen} from '@/modules/city-pass/components/CityPassLoginBoundaryScreen'
import {CityPassRouteName} from '@/modules/city-pass/routes'
import {devLog} from '@/processes/development'

export const ViewCityPassScreen = () => {
  const {params} = useRoute<CityPassRouteName.cityPassView>()

  devLog(params?.passNumber)

  const pasnummer_volledig = '6666666666666666666'

  return (
    <CityPassLoginBoundaryScreen
      scroll={false}
      testID="CityPassCityPassScreen">
      <Column
        grow={1}
        halign="center">
        <Paragraph>Ryan Huisman</Paragraph>
        <BarCode
          format="CODE128"
          maxHeight={100}
          maxWidth={400}
          value={pasnummer_volledig}
        />
        <Paragraph>{pasnummer_volledig}</Paragraph>
        <BarCode
          format="QR"
          maxHeight={300}
          maxWidth={400}
          value={pasnummer_volledig}
        />
      </Column>
    </CityPassLoginBoundaryScreen>
  )
}
