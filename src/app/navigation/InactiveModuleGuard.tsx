import {ComponentType, useLayoutEffect} from 'react'
import {NavigationProps, RootStackParams} from '@/app/navigation/types'
import {useScreenOptions} from '@/app/navigation/useScreenOptions'
import {Screen} from '@/components/features/screen/Screen'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Column} from '@/components/ui/layout/Column'
import {UnderConstructionFigure} from '@/components/ui/media/errors/UnderConstructionFigure'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useSelector} from '@/hooks/redux/useSelector'
import {ModuleSlug} from '@/modules/slugs'
import {ModuleStatus} from '@/modules/types'
import {selectCachedServerModules} from '@/store/slices/modules'

type Props = {
  component: ComponentType
  navigation: NavigationProps<keyof RootStackParams>['navigation']
  slug: ModuleSlug
}

export const InactiveModuleGuard = ({
  slug,
  component: Component,
  navigation,
  ...props
}: Props) => {
  const {cardStyle} = useScreenOptions()
  const cachedServerModules = useSelector(selectCachedServerModules)
  const module = cachedServerModules?.find(m => m.moduleSlug === slug)
  const openWebUrl = useOpenWebUrl()
  const fallbackUrl = module?.moduleFallbackUrl ?? module?.releaseFallbackUrl
  const reason = module?.moduleAppReason ?? module?.releaseAppReason

  useLayoutEffect(() => {
    navigation.setOptions({cardStyle})
  }, [cardStyle, navigation])

  if (module?.status === ModuleStatus.inactive) {
    return (
      <Screen
        bottomSheet
        headerOptions={{headerTitle: module.title}}
        testID="InactiveModuleGuardScreen">
        <Box>
          <Column gutter="xxl">
            <Column gutter="lg">
              <Column gutter="md">
                <Title
                  level="h2"
                  text="Dit onderdeel is nu niet beschikbaar"
                  textAlign="center"
                />
                {!!reason && <Paragraph textAlign="center">{reason}</Paragraph>}
                <Paragraph textAlign="center">
                  Probeer het later nog eens.
                </Paragraph>
              </Column>
              {!!fallbackUrl && (
                <Button
                  iconName="external-link"
                  iconSize="md"
                  label="Bekijk op Amsterdam.nl"
                  onPress={() => openWebUrl(fallbackUrl)}
                  testID="InactiveModuleGuardFallbackUrlButton"
                  variant="secondary"
                />
              )}
            </Column>
            <UnderConstructionFigure />
          </Column>
        </Box>
      </Screen>
    )
  }

  return <Component {...props} />
}
