import Remove from '@amsterdam/asc-assets/static/icons/TrashBin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {QuestionMarkSolid} from '@/assets/icons'
import {Box} from '@/components/ui'
import {AddButton, Button, IconButton} from '@/components/ui/buttons'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {AddressModalName} from '@/modules/address/routes'
import {removePrimaryAddress, selectAddress} from '@/modules/address/slice'
import {module as userModule} from '@/modules/user'
import {setAlert} from '@/store/alertSlice'
import {Theme, useThemable} from '@/themes'
import {Variant} from '@/types'

export const Address = () => {
  const dispatch = useDispatch()
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()
  const {primary: primaryAddress} = useSelector(selectAddress)
  const iconProps = useThemable(createIconProps)
  const [isTooltipVisible, setTooltipVisible] = useState(false)

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

  useEffect(() => {
    return navigation.addListener('blur', () => {
      isTooltipVisible && setTooltipVisible(false)
    })
  }, [isTooltipVisible, navigation])

  return (
    <Box background="white">
      <Column gutter="md">
        <Column gutter="xs">
          <Row gutter="sm" valign="center">
            <Title text="Adres" />
            <IconButton
              icon={
                <Icon size={24}>
                  <QuestionMarkSolid {...iconProps} />
                </Icon>
              }
              accessibilityLabel={`${
                isTooltipVisible ? 'Verberg' : 'Bekijk'
              } uitleg`}
              onPress={() => setTooltipVisible(!isTooltipVisible)}
            />
          </Row>
          {!!isTooltipVisible && (
            <Box insetHorizontal="md">
              <Tooltip
                placement={Placement.below}
                text="We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld."
              />
            </Box>
          )}
        </Column>
        {primaryAddress ? (
          <Column>
            <Paragraph>{primaryAddress.adres}</Paragraph>
            <Paragraph>
              {[
                primaryAddress.postcode.substring(0, 4),
                primaryAddress.postcode.substring(4, 6),
                primaryAddress.woonplaats.toUpperCase(),
              ].join(' ')}
            </Paragraph>
          </Column>
        ) : (
          <Paragraph>
            Vul een straatnaam en huisnummer in zodat u informatie krijgt uit
            die buurt.
          </Paragraph>
        )}
        {primaryAddress ? (
          <Row gutter="md">
            <Button
              label="Wijzig adres"
              onPress={() => navigation.navigate(AddressModalName.addressForm)}
              variant="primary"
            />
            <Button
              icon={Remove}
              label="Verwijder adres"
              onPress={removeAddressAndShowAlert}
              variant="tertiary"
            />
          </Row>
        ) : (
          <AddButton
            accessibilityLabel="Voeg adres toe"
            onPress={() => navigation.navigate(AddressModalName.addressForm)}
          />
        )}
      </Column>
    </Box>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
