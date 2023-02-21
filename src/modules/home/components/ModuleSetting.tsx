import {useDispatch} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Title, Paragraph} from '@/components/ui/text'
import {useModules} from '@/hooks'
import {InactiveModuleMessage} from '@/modules/home/components/InactiveModuleMessage'
import {Module, ModuleStatus} from '@/modules/types'
import {toggleModule} from '@/store'
import {accessibleText} from '@/utils'

type ModuleSettingContentProps = {
  description: string
  disabled: boolean
  iconName: IconName | 'projects'
  title: string
}

const ModuleSettingContent = ({
  description,
  iconName,
  disabled,
  title,
}: ModuleSettingContentProps) => {
  const color = !disabled ? 'secondary' : undefined
  return (
    <Column gutter="sm">
      <Row gutter="sm" valign="center">
        {/* TODO Remove fallback after updating icon name in database. */}
        {iconName === 'projects' ? (
          <Icon color={color} name="construction-work" size="lg" />
        ) : (
          !!iconName && <Icon color={color} name={iconName} size="lg" />
        )}
        <Title color={color} level="h5" text={title} />
      </Row>
      {disabled ? (
        <Paragraph variant="small">{description}</Paragraph>
      ) : (
        <InactiveModuleMessage />
      )}
    </Column>
  )
}

type ModuleSettingProps = {
  module: Module
}

export const ModuleSetting = ({
  module: {description, icon: iconName, slug, status, title},
}: ModuleSettingProps) => {
  const dispatch = useDispatch()
  const {selectedModulesBySlug} = useModules()

  const onChange = () => {
    dispatch(toggleModule(slug))
  }

  const isModuleActive = status === ModuleStatus.active

  const ModuleSettingContentComponent = (
    <ModuleSettingContent
      description={description}
      disabled={isModuleActive}
      iconName={iconName}
      title={title}
    />
  )

  return (
    <Box distinct>
      {isModuleActive ? (
        <Switch
          accessibilityLabel={accessibleText(title, description)}
          disabled={!isModuleActive}
          label={ModuleSettingContentComponent}
          onChange={onChange}
          value={selectedModulesBySlug.includes(slug) && isModuleActive}
        />
      ) : (
        ModuleSettingContentComponent
      )}
    </Box>
  )
}
