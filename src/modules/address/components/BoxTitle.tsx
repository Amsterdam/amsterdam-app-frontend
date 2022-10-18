import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {RootStackParams} from '@/app/navigation'
import {IconButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {module as userModule} from '@/modules/user'

export const BoxTitle = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  const [isTooltipVisible, setTooltipVisible] = useState(false)

  useEffect(() => {
    return navigation.addListener('blur', () => {
      isTooltipVisible && setTooltipVisible(false)
    })
  }, [isTooltipVisible, navigation])

  return (
    <Column gutter="xs">
      <Row gutter="sm" valign="center">
        <Title level="h2" text="Adres" />
        <IconButton
          icon={<Icon color="link" name="question-mark-solid" size={24} />}
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
  )
}
