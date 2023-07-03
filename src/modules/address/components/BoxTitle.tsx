import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect, useState} from 'react'
import {RootStackParams} from '@/app/navigation'
import {IconButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {userModule} from '@/modules/user'

export const BoxTitle = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  const [isTooltipVisible, setTooltipVisible] = useState(false)

  useEffect(
    () =>
      navigation.addListener('blur', () => {
        isTooltipVisible && setTooltipVisible(false)
      }),
    [isTooltipVisible, navigation],
  )

  return (
    <Column gutter="xs">
      <Row
        gutter="sm"
        valign="center">
        <Title
          level="h2"
          testID="AddressTitle"
          text="Adres"
        />
        <IconButton
          accessibilityLabel={`${
            isTooltipVisible ? 'Verberg' : 'Bekijk'
          } uitleg`}
          icon={
            <Icon
              color="link"
              name="question-mark-solid"
              size="lg"
            />
          }
          onPress={() => setTooltipVisible(!isTooltipVisible)}
          testID="AddressTooltipButton"
        />
      </Row>
      {!!isTooltipVisible && (
        <Box insetHorizontal="md">
          <Tooltip
            placement={Placement.below}
            testID="AddressTooltip"
            text="We gebruiken het adres alleen in de app om u de juiste informatie te tonen. Uw gegevens worden niet gedeeld."
          />
        </Box>
      )}
    </Column>
  )
}
