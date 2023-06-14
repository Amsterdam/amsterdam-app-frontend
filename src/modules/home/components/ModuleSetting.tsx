import {pascalCase} from 'pascal-case'
import {useDispatch} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon, IconName} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {TestProps} from '@/components/ui/types'
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
} & TestProps

const ModuleSettingContent = ({
  description,
  iconName,
  disabled,
  testID,
  title,
}: ModuleSettingContentProps) => {
  const color = !disabled ? 'secondary' : undefined

  return (
    <Column gutter="sm">
      <Row
        gutter="sm"
        valign="center">
        {/* TODO Remove fallback after updating icon name in database. */}
        {iconName === 'projects' ? (
          <Icon
            color={color}
            name="construction-work"
            size="lg"
            testID={testID ? `${testID}Icon` : undefined}
          />
        ) : (
          !!iconName && (
            <Icon
              color={color}
              name={iconName}
              size="lg"
              testID={testID ? `${testID}Icon` : undefined}
            />
          )
        )}
        <Title
          color={color}
          level="h5"
          testID={testID ? `${testID}Title` : undefined}
          text={title}
        />
      </Row>
      {disabled ? (
        <Paragraph
          testID={testID ? `${testID}Paragraph` : undefined}
          variant="small">
          {description}
        </Paragraph>
      ) : (
        <InactiveModuleMessage />
      )}
    </Column>
  )
}

type ModuleSettingProps = {
  module: Module
} & TestProps

export const ModuleSetting = ({
  module: {description, icon: iconName, slug, status, title},
}: ModuleSettingProps) => {
  const dispatch = useDispatch()
  const {enabledModulesBySlug} = useModules()

  const onChange = () => {
    dispatch(toggleModule(slug))
  }

  const isModuleActive = status === ModuleStatus.active

  const ModuleSettingContentComponent = (
    <ModuleSettingContent
      disabled={isModuleActive}
      testID={`HomeModuleSetting${pascalCase(slug)}`}
      {...{description, iconName, title}}
    />
  )

  return (
    <Box
      distinct
      testID={`HomeModuleSetting${pascalCase(slug)}Box`}>
      {isModuleActive ? (
        <Switch
          accessibilityLabel={accessibleText(title, description)}
          disabled={!isModuleActive}
          label={ModuleSettingContentComponent}
          onChange={onChange}
          testID={`HomeModuleSetting${pascalCase(slug)}Switch`}
          value={enabledModulesBySlug.includes(slug) && isModuleActive}
        />
      ) : (
        ModuleSettingContentComponent
      )}
    </Box>
  )
}
