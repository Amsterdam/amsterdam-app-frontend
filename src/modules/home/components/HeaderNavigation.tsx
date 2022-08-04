import Api from '@amsterdam/asc-assets/static/icons/Api.svg'
import PersonalLogin from '@amsterdam/asc-assets/static/icons/PersonalLogin.svg'
import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {SVGProps} from 'react'
import {RootStackParams} from '@/app/navigation'
import {Settings} from '@/assets/icons'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {module as userModule} from '@/modules/user'
import {isDevApp} from '@/processes'
import {Theme, useThemable} from '@/themes'

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, ModuleSlug.home>>()

  const iconProps = useThemable(createIconProps)

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Omgeving selecteren"
          icon={
            <Icon scalesWithFont={false} size={24}>
              <Api {...iconProps} />
            </Icon>
          }
          onPress={() => navigation.navigate(HomeRouteName.admin)}
        />
      )}
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={
          <Icon scalesWithFont={false} size={24}>
            <PersonalLogin {...iconProps} />
          </Icon>
        }
        onPress={() => navigation.navigate(userModule.slug)}
      />
      <IconButton
        accessibilityLabel="Instellingen"
        icon={
          <Icon scalesWithFont={false} size={24}>
            <Settings {...iconProps} />
          </Icon>
        }
        onPress={() => navigation.navigate(HomeRouteName.settings)}
      />
    </Row>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.pressable.default.background,
})
