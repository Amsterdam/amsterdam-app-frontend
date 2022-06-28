import Api from '@amsterdam/asc-assets/static/icons/Api.svg'
import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParamList} from '@/app/navigation'
import {Settings} from '@/assets/icons'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {HomeRouteName} from '@/modules/home/routes'
import {module as userModule} from '@/modules/user'
import {isDevApp} from '@/services'
import {Theme, useThemable} from '@/themes'

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'HomeModule'>>()

  const iconProps = useThemable(createIconProps)

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Omgeving selecteren"
          icon={
            <Icon size={24}>
              <Api {...iconProps} />
            </Icon>
          }
          onPress={() => navigation.navigate(HomeRouteName.admin)}
        />
      )}
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={
          <Icon size={24}>
            <PersonalLogin {...iconProps} />
          </Icon>
        }
        onPress={() => navigation.navigate(userModule.name)}
      />
      <IconButton
        accessibilityLabel="Instellingen"
        icon={
          <Icon size={24}>
            <Settings {...iconProps} />
          </Icon>
        }
        onPress={() => navigation.navigate(HomeRouteName.settings)}
      />
    </Row>
  )
}

const createIconProps = ({color}: Theme) => ({
  fill: color.pressable.default.background,
})
