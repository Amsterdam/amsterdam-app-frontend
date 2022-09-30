import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column, Row} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {Address} from '@/modules/address'
import {ModuleSlug} from '@/modules/slugs'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

type Props = {
  address: Address
}

export const WasteGuideByAddressNoDetails = ({address}: Props) => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof ModuleSlug['waste-guide']>
    >()

  const fullAddress = [
    `${address.adres},`,
    address.postcode,
    address.woonplaats,
  ].join(' ')

  return (
    <Box insetHorizontal="md">
      <Column gutter="sm">
        <Title level="h2" text="Niet gevonden" />
        <Paragraph>
          We konden geen afvalinformatie vinden voor het adres {fullAddress}.
        </Paragraph>
        <Row align="start">
          <Button
            label="Hier klopt iets niet"
            onPress={() =>
              navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
            }
          />
        </Row>
      </Column>
    </Box>
  )
}
