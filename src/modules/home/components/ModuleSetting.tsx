import {pascalCase} from 'pascal-case'
import {ReactNode, useCallback} from 'react'
import {Box} from '@/components/ui/containers/Box'
import {Switch} from '@/components/ui/forms/Switch'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {SvgIconName} from '@/components/ui/media/svgIcons'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Title} from '@/components/ui/text/Title'
import {type TestProps} from '@/components/ui/types'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {InactiveModuleMessage} from '@/modules/home/components/InactiveModuleMessage'
import {Module, ModuleStatus} from '@/modules/types'
import {selectDisabledModules, toggleModule} from '@/store/slices/modules'
import {accessibleText} from '@/utils/accessibility/accessibleText'

type ModuleSettingWrapperProps = {
  children: ReactNode
  slug: Module['slug']
}

const ModuleSettingBox = ({children, slug}: ModuleSettingWrapperProps) => (
  <Box
    testID={`UserModuleSettings${pascalCase(slug)}Box`}
    variant="distinct">
    {children}
  </Box>
)

type ModuleSettingContentProps = {
  description: string
  disabled: boolean
  iconName: SvgIconName
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
      <Row gutter="sm">
        {!!iconName && (
          <Icon
            color={color}
            name={iconName}
            size="lg"
            testID={`${testID}Icon`}
          />
        )}
        <Title
          color={color}
          level="h5"
          testID={`${testID}Title`}
          text={title}
        />
      </Row>
      {disabled ? (
        <Paragraph
          testID={`${testID}Paragraph`}
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
  testID,
}: ModuleSettingProps) => {
  const dispatch = useDispatch()
  const disabledModules = useSelector(selectDisabledModules)

  const onChange = () => {
    dispatch(toggleModule(slug))
  }

  const isModuleActive = status === ModuleStatus.active

  const value = !disabledModules?.includes(slug) && isModuleActive

  const ModuleSettingContentComponent = (
    <ModuleSettingContent
      description={description}
      disabled={isModuleActive}
      iconName={iconName}
      testID={`${testID}Content`}
      title={title}
    />
  )

  const EnhancedModuleSettingBox = useCallback(
    (props: ModuleSettingWrapperProps) => (
      <ModuleSettingBox
        {...props}
        slug={slug}
      />
    ),
    [slug],
  )

  if (!isModuleActive) {
    return (
      <ModuleSettingBox slug={slug}>
        {ModuleSettingContentComponent}
      </ModuleSettingBox>
    )
  }

  return (
    <Switch
      accessibilityLabel={accessibleText(title, description)}
      disabled={!isModuleActive}
      label={ModuleSettingContentComponent}
      onChange={onChange}
      testID={`${testID}Switch`}
      value={value}
      wrapper={EnhancedModuleSettingBox}
    />
  )
}
