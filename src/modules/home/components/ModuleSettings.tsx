import React from 'react'
import {useDispatch} from 'react-redux'
import {Box, PleaseWait} from '@/components/ui'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {ModuleBox} from '@/modules/home/components/index'
import {icons} from '@/modules/home/config'
import {useModules} from '@/modules/home/hooks'
import {toggleModule} from '@/modules/home/store'
import {useTheme} from '@/themes'
import {accessibleText} from '@/utils'

export const ModuleSettings = () => {
  const dispatch = useDispatch()
  const {modules, selectedModulesBySlug} = useModules()

  const {color} = useTheme()

  const onChange = (slug: string) => {
    dispatch(toggleModule(slug))
  }

  if (!modules) {
    return <PleaseWait />
  }

  return (
    <Box>
      <Column gutter="sm">
        {modules.map(module => {
          const isSelected =
            selectedModulesBySlug?.includes(module.slug) ?? false
          const {description, icon, slug, title} = module
          const ModuleIcon = icons[icon]

          return (
            <ModuleBox key={slug} selected={isSelected}>
              <Switch
                accessibilityLabel={accessibleText(title, description)}
                label={
                  <Row gutter="md" valign="center">
                    {!!ModuleIcon && (
                      <Icon size={24}>
                        <ModuleIcon fill={color.text.default} />
                      </Icon>
                    )}
                    <Title level="h5" text={title} />
                  </Row>
                }
                onChange={() => onChange(slug)}
                value={isSelected}
              />
            </ModuleBox>
          )
        })}
      </Column>
    </Box>
  )
}
