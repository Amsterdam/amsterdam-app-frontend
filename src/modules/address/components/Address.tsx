import Remove from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps, useState} from 'react'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Question} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Button, IconButton} from '@/components/ui/buttons'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Gutter, Row} from '@/components/ui/layout'
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
import {Theme, useThemable, useTheme} from '@/themes'
import {Variant} from '@/types'
import {isEmptyObject} from '@/utils'

const TitleAndHelp = () => {
  const [tooltipIsVisible, setTooltipIsVisible] = useState(false)
  const {color} = useTheme()

  return (
    <Column gutter="sm">
      <Row gutter="sm">
        <Title text="Adres" />
        <IconButton
          icon={
            <Icon size={24}>
              <Question fill={color.pressable.primary.default} />
            </Icon>
          }
          onPress={() => setTooltipIsVisible(!tooltipIsVisible)}
        />
      </Row>
      {!!tooltipIsVisible && (
        <Box insetHorizontal="lg">
          <Tooltip
            placement="bottom"
            text="We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld."
          />
        </Box>
      )}
    </Column>
  )
}

export const Address = () => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()
  const {primary: primaryAddress} = useSelector(selectAddress)
  const iconProps = useThemable(createIconProps)

  const removeAddressAndShowAlert = () => {
    dispatch(removePrimaryAddress())
    dispatch(
      setAlert({
        content: {
          title: 'Gelukt',
          text: 'Het adres is verwijderd uit uw profiel.',
        },
        variant: Variant.success,
        isVisible: true,
      }),
    )
  }

  return (
    <Box background="white">
      {primaryAddress && !isEmptyObject(primaryAddress) ? (
        <>
          <TitleAndHelp />
          <Gutter height="md" />
          <Paragraph>{primaryAddress.adres}</Paragraph>
          <Paragraph>
            {[
              primaryAddress.postcode.substring(0, 4),
              primaryAddress.postcode.substring(4, 6),
              primaryAddress.woonplaats.toUpperCase(),
            ].join(' ')}
          </Paragraph>
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
          <TitleAndHelp />
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

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
