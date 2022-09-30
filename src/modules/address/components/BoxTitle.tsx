import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps, useEffect, useState} from 'react'
import {RootStackParams} from '@/app/navigation'
import {QuestionMarkSolid} from '@/assets/icons'
import {Box} from '@/components/ui'
import {IconButton} from '@/components/ui/buttons'
import {Tooltip} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {Placement} from '@/components/ui/types'
import {module as userModule} from '@/modules/user'
import {Theme, useThemable} from '@/themes'

export const BoxTitle = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof userModule.slug>
    >()

  const [isTooltipVisible, setTooltipVisible] = useState(false)
  const iconProps = useThemable(createIconProps)

  useEffect(() => {
    return navigation.addListener('blur', () => {
      isTooltipVisible && setTooltipVisible(false)
    })
  }, [isTooltipVisible, navigation])

  return (
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
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
