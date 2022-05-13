import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Theme, useThemable} from '../../../themes'
import {Box, Tooltip} from '../../ui'
import {Switch} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Title} from '../../ui/typography'
import mock from './mock.json'
import {selectModules, toggleModule} from './modulesSlice'
import {icons, ModuleBox} from './'

export const SelectModules = () => {
  const dispatch = useDispatch()
  const {modules} = useSelector(selectModules)

  // TODO Create `Icon` component with size and color props
  const IconProps = (selected: boolean) =>
    useThemable(createIconProps(selected))

  const styles = useThemable(createStyles)

  const onChange = (slug: string) => {
    dispatch(toggleModule(slug))
  }

  return (
    <Box>
      <Column gutter="sm">
        {mock.modules.map(module => {
          const {description, icon, slug, title} = module
          const isSelected = modules.includes(slug)
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
                label={
                  <Row gutter="md" valign="center">
                    <Icon {...IconProps(isSelected)} />
                    <Title
                      level="h5"
                      prominence={isSelected ? 1 : 2}
                      text={title}
                    />
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
