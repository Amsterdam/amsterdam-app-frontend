import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {Theme, useThemable} from '../../../themes'
import {Box, Tooltip} from '../../ui'
import {Switch} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Title} from '../../ui/typography'
import mock from './mock.json'
import {icons, Module, ModuleBox} from './'

type ModuleWithSelection = Module & {
  selected: boolean
}

// TODO Retrieve from store
const initialSelectedModules: ModuleWithSelection[] = mock.modules.map(m => ({
  ...m,
  selected: !['open-waste-container', 'city-offices'].includes(m.slug),
}))

export const SelectModules = () => {
  // TODO Store on device
  const [selectedModules, setSelectedModules] = useState<ModuleWithSelection[]>(
    initialSelectedModules,
  )

  // TODO Create `Icon` component with size and color props
  const IconProps = (selected: boolean) =>
    useThemable(createIconProps(selected))

  // TODO Save to store
  const onChangeSelection = (module: Module, selected: boolean) => {
    setSelectedModules(
      selectedModules.map(m => (m.slug === module.slug ? {...m, selected} : m)),
    )
  }

  const styles = useThemable(createStyles)

  return (
    <Box>
      <Column gutter="sm">
        {selectedModules.map(module => {
          const {description, selected, slug, title} = module
          const Icon = icons[slug]

          return (
            <ModuleBox
              expandedChildren={
                <View style={styles.tooltipContainer}>
                  <Tooltip text={description} />
                </View>
              }
              key={slug}
              selected={selected}>
              <Switch
                label={
                  <Row gutter="md" valign="center">
                    <Icon {...IconProps(selected)} />
                    <Title
                      level="h5"
                      prominence={selected ? 1 : 2}
                      text={title}
                    />
                  </Row>
                }
                onValueChange={value => onChangeSelection(module, value)}
                value={selected}
              />
            </ModuleBox>
          )
        })}
      </Column>
    </Box>
  )
}

const createIconProps = (selected: boolean) => (theme: Theme) => ({
  width: 24,
  aspectRatio: 1,
  fill: selected ? theme.color.text.default : theme.color.text.secondary,
})

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    tooltipContainer: {
      marginTop: theme.size.spacing.md,
      marginBottom: theme.size.spacing.sm,
      marginHorizontal: theme.size.spacing.lg,
    },
  })
