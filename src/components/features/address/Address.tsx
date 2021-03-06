import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {View} from 'react-native'
import {StackParams} from '../../../app/navigation'
import {routes} from '../../../app/navigation/routes'
import {AlertContext, SettingsContext} from '../../../providers'
import {
  Button,
  Card,
  CardBody,
  SingleSelectable,
  Text,
  TextButton,
  Title,
} from '../../ui'
import {Column, Gutter, Row} from '../../ui/layout'

export const Address = () => {
  const navigation = useNavigation<StackNavigationProp<StackParams, 'Home'>>()
  const {removeSetting, settings} = useContext(SettingsContext)
  const {address} = {...settings}
  const {changeContent, changeVariant} = useContext(AlertContext)

  const removeAddressAndShowAlert = async () => {
    const response = await removeSetting('address')
    if (response === 'success') {
      changeContent({
        title: 'Gelukt',
        text: 'Het adres is verwijderd uit uw profiel.',
      })
      changeVariant('success')
    } else {
      changeContent({
        title: 'Niet gelukt',
        text: 'Uw adres is niet opgeslagen',
      })
      changeVariant('failure')
    }
  }

  return (
    <>
      {address ? (
        <Card>
          <CardBody>
            <SingleSelectable>
              <Title level={4} text="Uw adres" />
              <Text large>{address.adres}</Text>
              <Text large>
                {[address.postcode, address.woonplaats].join(' ')}
              </Text>
            </SingleSelectable>
            <Row align="between" valign="center" gutter="md" wrap>
              <View>
                <Gutter height="md" />
                <Button
                  variant="inverse"
                  onPress={() => navigation.navigate(routes.addressForm.name)}
                  text="Wijzig adres"
                />
              </View>
              <View>
                <Gutter height="md" />
                <TextButton
                  emphasis
                  icon="remove"
                  onPress={removeAddressAndShowAlert}
                  text="Verwijder adres"
                />
              </View>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <Column gutter="md">
              <>
                <Title level={4} text="Adres" />
                <Text>
                  Vul een adres en huisnummer in zodat u informatie krijgt uit
                  die buurt.
                </Text>
                <Row align="start">
                  <Button
                    onPress={() => navigation.navigate(routes.addressInfo.name)}
                    text="Meer informatie"
                    variant="text"
                  />
                </Row>
              </>
              <Row align="start">
                <Button
                  onPress={() => navigation.navigate(routes.addressForm.name)}
                  text="Vul adres in"
                  variant="inverse"
                />
              </Row>
            </Column>
          </CardBody>
        </Card>
      )}
    </>
  )
}
