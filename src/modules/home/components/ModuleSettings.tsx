import React from 'react'
import {StyleSheet, View} from 'react-native'
import {getVersion} from 'react-native-device-info'
import {useDispatch} from 'react-redux'
import {Box, PleaseWait} from '@/components/ui'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {ModulesWarning} from '@/modules/home/components'
import {icons} from '@/modules/home/config'
import {useModules} from '@/modules/home/hooks'
import {toggleModule} from '@/modules/home/store'
import {Theme, useThemable, useTheme} from '@/themes'
import {accessibleText} from '@/utils'

export const ModuleSettings = () => {
  const dispatch = useDispatch()
  const {modules, modulesLoading, selectedModulesBySlug} = useModules()

  const {color} = useTheme()
  const styles = useThemable(createStyles)

  const onChange = (slug: string) => {
    dispatch(toggleModule(slug))
  }

  if (modulesLoading) {
    return <PleaseWait fullSize />
  }

  if (!modules.length) {
    return (
      <ModulesWarning
        text={`We hebben geen modules gevonden voor versie ${getVersion()} van de app.`}
      />
    )
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
            <View
              key={slug}
              style={[styles.box, isSelected && styles.selected]}>
              <Switch
                accessibilityLabel={accessibleText(title, description)}
                label={
                  <Column gutter="sm">
                    <Row gutter="sm" valign="center">
                      {!!ModuleIcon && (
                        <Icon size={24}>
                          <ModuleIcon fill={color.text.default} />
                        </Icon>
                      )}
                      <Title level="h5" text={title} />
                    </Row>
                    <Paragraph variant="small">{description}</Paragraph>
                  </Column>
                }
                onChange={() => onChange(slug)}
                value={isSelected}
              />
            </View>
          )
        })}
      </Column>
    </Box>
  )
}

const createStyles = ({border, color, size}: Theme) =>
  StyleSheet.create({
    box: {
      padding: size.spacing.md - border.width.sm,
      borderWidth: border.width.sm,
      borderStyle: 'dashed',
      borderColor: color.border.primary,
    },
    selected: {
      backgroundColor: color.background.cutout,
      borderColor: 'transparent',
    },
  })
