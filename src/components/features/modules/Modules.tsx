import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {clientModules} from '../../../modules'
import {Module, ServerModule} from '../../../modules/types'
import {Theme, useThemable} from '../../../themes'
import {color} from '../../../tokens'
import {combineClientAndServerModules} from '../../../utils'
import mock from './mock.json'
import {selectModules} from './modulesSlice'
import {icons, ModuleButton} from './'

const serverModules = mock.modules as ServerModule[]
const modules = combineClientAndServerModules(clientModules, serverModules)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

const renderModuleButton = (module: Module) => {
  const {icon, name, slug, title} = module
  const Icon = icons[icon]

  return (
    <ModuleButton
      icon={<Icon {...iconProps} />}
      key={slug}
      label={title}
      name={name}
    />
  )
}

export const Modules = () => {
  const {modules: storedModuleSlugs} = useSelector(selectModules)
  const mockServerModules = serverModules
    .filter(m => m.status === 1)
    .filter(m => storedModuleSlugs.includes(m.slug))
  console.log({mockServerModules})
  const styles = useThemable(createStyles)

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={modules}
      renderItem={({item}) => renderModuleButton(item)}
    />
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    list: {
      padding: theme.size.spacing.md,
    },
  })
