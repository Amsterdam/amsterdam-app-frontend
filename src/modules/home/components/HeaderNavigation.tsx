import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon, IconProps} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {isDevApp} from '@/processes/development'

export const HeaderNavigation = () => {
  const navigation = useNavigation<HomeRouteName>()

  const iconProps: Partial<IconProps> = {
    color: 'link',
    size: 'lg',
  }

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Selecteer omgeving"
          icon={
            <Icon
              name="api"
              {...iconProps}
            />
          }
          onPress={() => navigation.navigate(HomeRouteName.admin)}
          testID="HeaderEnvironmentButton"
        />
      )}
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={
          <Icon
            name="person"
            {...iconProps}
          />
        }
        onPress={() => navigation.navigate(ModuleSlug.user)}
        testID="HeaderUserButton"
      />
      <IconButton
        accessibilityLabel="Instellingen"
        icon={
          <Icon
            name="settings"
            {...iconProps}
          />
        }
        onPress={() => navigation.navigate(HomeRouteName.settings)}
        testID="HeaderModuleSettingsButton"
      />
    </Row>
  )
}
