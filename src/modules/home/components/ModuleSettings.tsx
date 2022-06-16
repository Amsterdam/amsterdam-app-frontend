import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {Box, PleaseWait, Tooltip} from '@/components/ui'
import {Switch} from '@/components/ui/forms'
import {Column, Row} from '@/components/ui/layout'
import {Title} from '@/components/ui/typography'
import {ModuleBox} from '@/modules/home/components/index'
import {icons} from '@/modules/home/config'
import {useModules} from '@/modules/home/hooks'
import {toggleModule} from '@/modules/home/store'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

export const ModuleSettings = () => {
  const dispatch = useDispatch()
  const {modules, selectedModulesBySlug} = useModules()

  // TODO Create `Icon` component with size and color props
  const iconProps = useThemable(createIconProps)

  const styles = useThemable(createStyles)

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
          const Icon = icons[icon]

          return (
            <ModuleBox
              expandedChildren={
                <View style={styles.tooltipContainer}>
                  <Tooltip text={description} />
                </View>
              }
              key={slug}
              selected={isSelected}>
              <Switch
                accessibilityLabel={accessibleText(title, description)}
                label={
                  <Row gutter="md" valign="center">
                    <Icon {...iconProps} />
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

const createIconProps = ({color}: Theme) => ({
  width: 24,
  aspectRatio: 1,
  fill: color.text.default,
})

const createStyles = ({size}: Theme) =>
  StyleSheet.create({
    tooltipContainer: {
      marginTop: size.spacing.md,
      marginBottom: size.spacing.sm,
      marginHorizontal: size.spacing.lg,
    },
  })
