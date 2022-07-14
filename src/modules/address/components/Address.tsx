import Remove from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Card, CardBody, SingleSelectable, Text, Title} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Gutter, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {module as addressModule} from '@/modules/address'
import {
  removePrimaryAddress,
  selectAddress,
} from '@/modules/address/addressSlice'
import {AddressRouteName} from '@/modules/address/routes'
import {module as userModule} from '@/modules/user'
import {setAlert} from '@/store/alertSlice'
import {Theme, useThemable} from '@/themes'
import {isEmptyObject} from '@/utils'

export const Address = () => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()
  const {primary: primaryAddress} = useSelector(selectAddress)
  const iconProps = useThemable(createIconProps)

  const removeAddressAndShowAlert = async () => {
    dispatch(removePrimaryAddress())
    dispatch(
      setAlert({
        content: {
          title: 'Gelukt',
          text: 'Het adres is verwijderd uit uw profiel.',
        },
        variant: 'success',
        isVisible: true,
      }),
    )
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
            <Row valign="center" gutter="md" wrap>
              <View>
                <Gutter height="md" />
                <Button
                  label="Wijzig adres"
                  onPress={() =>
                    navigation.navigate(addressModule.slug, {
                      screen: AddressRouteName.addressForm,
                    })
                  }
                  variant="primary"
                />
              </View>
              <View>
                <Gutter height="md" />
                <Button
                  icon={
                    <Icon size={24}>
                      <Remove {...iconProps} />
                    </Icon>
                  }
                  label="Verwijder adres"
                  onPress={removeAddressAndShowAlert}
                  variant="secondary"
                />
              </View>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <Title level={4} text="Adres" />
            <Text>
              Vul een straatnaam en huisnummer in zodat u informatie krijgt uit
              die buurt.
            </Text>
            <Row valign="center" gutter="md" wrap>
              <View>
                <Gutter height="md" />
                <Button
                  label="Vul adres in"
                  onPress={() =>
                    navigation.navigate(addressModule.slug, {
                      screen: AddressRouteName.addressForm,
                    })
                  }
                  variant="primary"
                />
              </View>
              <View>
                <Gutter height="md" />
                <Button
                  label="Meer informatie"
                  onPress={() =>
                    navigation.navigate(addressModule.slug, {
                      screen: AddressRouteName.addressInfo,
                    })
                  }
                  variant="secondary"
                />
              </View>
            </Row>
          </CardBody>
        </Card>
      )}
    </>
  )
}

const createIconProps = ({color}: Theme): SVGProps<any> => ({
  fill: color.text.link,
})
