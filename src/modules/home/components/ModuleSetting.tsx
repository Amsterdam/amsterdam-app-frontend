import {useDispatch} from 'react-redux'
import {Box} from '@/components/ui/containers'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title, Paragraph} from '@/components/ui/text'
import {useModules} from '@/hooks'
import {Module} from '@/modules/types'
import {toggleModule} from '@/store'
import {accessibleText} from '@/utils'

type Props = {
  module: Module
}

const isModuleDisabledText = 'Deze module is momenteel niet beschikbaar.'

export const ModuleSetting = ({
  module: {description, icon: iconName, slug, status, title},
}: Props) => {
  const dispatch = useDispatch()
  const {selectedModulesBySlug} = useModules()

  const onChange = () => {
    dispatch(toggleModule(slug))
  }

  const isModuleDisabled = status === 0
  const isModuleEnabled = status === 1

  const color = isModuleDisabled ? 'secondary' : undefined
  const colorParagraph = isModuleDisabled ? 'warning' : undefined

  return (
    <Box distinct>
      <Switch
        accessibilityLabel={accessibleText(title, description)}
        disabled={isModuleDisabled}
        label={
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
            <Paragraph color={colorParagraph} variant="small">
              {isModuleEnabled ? description : isModuleDisabledText}
            </Paragraph>
          </Column>
        }
        onChange={onChange}
        value={selectedModulesBySlug.includes(slug) && isModuleEnabled}
      />
    </Box>
  )
}
