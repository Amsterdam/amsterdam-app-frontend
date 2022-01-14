import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {AddressContext, AlertContext} from '../../../providers'
import {
  Attention,
  Button,
  Card,
  CardBody,
  SingleSelectable,
  Text,
  TextButton,
  Title,
} from '../../ui'
import {Gutter, Row} from '../../ui/layout'
import {AddressFormTeaser} from './'

export const Address = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()
  const {address, removeAddress} = useContext(AddressContext)
  const {changeContent, changeVariant} = useContext(AlertContext)

  const removeAddressAndShowAlert = () => {
    removeAddress()
    changeContent({
      title: 'Gelukt',
      text: 'Het adres is verwijderd uit uw profiel.',
    })
    changeVariant('success')
  }

  return (
    <>
      {address ? (
        <Card>
          <CardBody>
            <SingleSelectable>
              <Text secondary>Uw adres:</Text>
              <Gutter height="sm" />
              <Title level={4} margin text={address.adres} />
              <Text>{[address.postcode, address.woonplaats].join(' ')}</Text>
            </SingleSelectable>
            <Gutter height="md" />
            <Row align="between" valign="center">
              <Button
                variant="inverse"
                onPress={() => navigation.navigate(routes.addressForm.name)}
                text="Wijzig adres"
              />
              <TextButton
                emphasis
                icon="remove"
                onPress={removeAddressAndShowAlert}
                text="Verwijder adres"
              />
            </Row>
          </CardBody>
        </Card>
      ) : (
        <>
          <AddressFormTeaser
            text="Vul uw adres en huisnummer in zodat we informatie uit uw buurt kunnen tonen."
            title="Uw buurt"
          />
          <Gutter height="md" />
          <Attention>
            <Text>
              Uw adres wordt alleen op uw telefoon opgeslagen en gebruikt om de
              app voor u te personaliseren.
            </Text>
          </Attention>
        </>
      )}
    </>
  )
}
