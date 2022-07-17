import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {IconButton} from '@/components/ui/buttons'
import {Row} from '@/components/ui/layout'
import {Icon, IconProps} from '@/components/ui/media'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {module as userModule} from '@/modules/user'
import {isDevApp} from '@/processes'

export const HeaderNavigation = () => {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParams, ModuleSlug.home>>()

  const iconProps: Partial<IconProps> = {
    color: 'link',
    scalesWithFont: false,
    size: 24,
  }

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Omgeving selecteren"
          icon={<Icon name="api" {...iconProps} />}
          onPress={() => navigation.navigate(HomeRouteName.admin)}
        />
      )}
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={<Icon name="person" {...iconProps} />}
        onPress={() => navigation.navigate(userModule.slug)}
      />
      <IconButton
        accessibilityLabel="Instellingen"
        icon={<Icon name="settings" {...iconProps} />}
        onPress={() => navigation.navigate(HomeRouteName.settings)}
      />
    </Row>
  )
}
