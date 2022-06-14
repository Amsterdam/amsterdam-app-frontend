import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {module as addressModule} from '../'
import {RootStackParamList} from '../../../app/navigation'
import {
  Button,
  Card,
  CardBody,
  SingleSelectable,
  Text,
  TextButton,
  Title,
} from '../../../components/ui'
import {Column, Gutter, Row} from '../../../components/ui/layout'
import {AlertContext} from '../../../providers'
import {isEmptyObject} from '../../../utils'
import {module as userModule} from '../../user'
import {removePrimaryAddress, selectAddress} from '../addressSlice'
import {AddressRouteName} from '../routes'

export const Address = () => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParamList, typeof userModule.name>
    >()
  const {primary: primaryAddress} = useSelector(selectAddress)

  const {changeContent, changeVariant} = useContext(AlertContext)

  const removeAddressAndShowAlert = async () => {
    dispatch(removePrimaryAddress())
    changeContent({
      title: 'Gelukt',
      text: 'Het adres is verwijderd uit uw profiel.',
    })
    changeVariant('success')
  }

  return (
    <>
      {primaryAddress && !isEmptyObject(primaryAddress) ? (
        <Card>
          <CardBody>
            <SingleSelectable>
              <Title level={4} text="Uw adres" />
              <Text large>{primaryAddress.adres}</Text>
              <Text large>
                {[primaryAddress.postcode, primaryAddress.woonplaats].join(' ')}
              </Text>
            </SingleSelectable>
            <Row align="between" valign="center" gutter="md" wrap>
              <View>
                <Gutter height="md" />
                <Button
                  variant="inverse"
                  onPress={() =>
                    navigation.navigate(addressModule.name, {
                      screen: AddressRouteName.addressForm,
                    })
                  }
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
                    onPress={() =>
                      navigation.navigate(addressModule.name, {
                        screen: AddressRouteName.addressInfo,
                      })
                    }
                    text="Meer informatie"
                    variant="text"
                  />
                </Row>
              </>
              <Row align="start">
                <Button
                  onPress={() =>
                    navigation.navigate(addressModule.name, {
                      screen: AddressRouteName.addressForm,
                    })
                  }
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