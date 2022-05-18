import React from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {Box, Tooltip} from '../../../components/ui'
import {Switch} from '../../../components/ui/forms'
import {Column, Row} from '../../../components/ui/layout'
import {Title} from '../../../components/ui/typography'
import {Theme, useThemable} from '../../../themes'
import {icons} from '../config'
import {selectModules, toggleModule} from '../store'
import serverModulesMock from '../store/server-modules.mock.json'
import {ModuleBox} from './'

export const SelectModules = () => {
  const dispatch = useDispatch()
  const {modules} = useSelector(selectModules)

  // TODO Create `Icon` component with size and color props
  const iconProps = useThemable(createIconProps)

  const styles = useThemable(createStyles)

  const onChange = (slug: string) => {
    dispatch(toggleModule(slug))
  }

  return (
    <Box>
      <Column gutter="sm">
        {serverModulesMock.modules.map(module => {
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
