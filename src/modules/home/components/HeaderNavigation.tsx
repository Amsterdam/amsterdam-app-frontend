import {IconButton} from '@/components/ui/buttons/IconButton'
import {Row} from '@/components/ui/layout/Row'
import {Icon, IconProps} from '@/components/ui/media/Icon'
import {useNavigation} from '@/hooks/navigation/useNavigation'
import {useModules} from '@/hooks/useModules'
import {HomeRouteName} from '@/modules/home/routes'
import {ModuleSlug} from '@/modules/slugs'
import {isDevApp} from '@/processes/development'

export const HeaderNavigation = () => {
  const navigation = useNavigation<HomeRouteName>()

  const iconProps: Partial<IconProps> = {
    color: 'link',
    size: 'lg',
  }

  const {enabledModules} = useModules()

  return (
    <Row gutter="md">
      {!!isDevApp && (
        <IconButton
          accessibilityLabel="Selecteer omgeving"
          icon={
            <Icon
              name="api"
              {...iconProps}
              testID="HeaderEnvironmentIcon"
            />
          }
          onPress={() => navigation.navigate(HomeRouteName.admin)}
          testID="HeaderEnvironmentButton"
        />
      )}
      {enabledModules?.map(({HeaderComponent, slug}) =>
        HeaderComponent ? <HeaderComponent key={slug} /> : null,
      )}
      <IconButton
        accessibilityLabel="Mijn profiel"
        icon={
          <Icon
            name="person"
            {...iconProps}
            testID="HeaderUserIcon"
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
            testID="HeaderModuleSettingsIcon"
          />
        }
        onPress={() => navigation.navigate(HomeRouteName.settings)}
        testID="HeaderModuleSettingsButton"
      />
    </Row>
  )
}
