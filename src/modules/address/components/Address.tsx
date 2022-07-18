import Remove from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Box, SingleSelectable} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Gutter, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
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
    <Box background="white">
      {primaryAddress && !isEmptyObject(primaryAddress) ? (
        <>
          <SingleSelectable>
            <Title text="Adres" />
            <Gutter height="md" />
            <Paragraph>{primaryAddress.adres}</Paragraph>
            <Paragraph>
              {[
                primaryAddress.postcode.substring(0, 4),
                primaryAddress.postcode.substring(4, 6),
                primaryAddress.woonplaats.toUpperCase(),
              ].join(' ')}
            </Paragraph>
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
        </>
      ) : (
        <>
          <SingleSelectable>
            <Title text="Adres" />
            <Gutter height="md" />
            <Paragraph>
              Vul een straatnaam en huisnummer in zodat u informatie krijgt uit
              die buurt.
            </Paragraph>
          </SingleSelectable>
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
        </>
      )}
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<any> => ({
  fill: color.text.link,
})
