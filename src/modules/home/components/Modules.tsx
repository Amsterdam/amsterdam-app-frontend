import React from 'react'
import {FlatList, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {Theme, useThemable} from '../../../themes'
import {color} from '../../../tokens'
import {combineClientAndServerModules} from '../../../utils'
import {clientModules} from '../../index'
import {Module, ServerModule} from '../../types'
import {ModuleButton} from '../components'
import {icons} from '../config'
import {selectModules} from '../store'
import serverModulesMock from '../store/server-modules.mock.json'

const serverModules = serverModulesMock.modules as ServerModule[]
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
  const availableModules = modules
    .filter(m => m.status === 1)
    .filter(m => storedModuleSlugs.includes(m.slug))

  const styles = useThemable(createStyles)

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={availableModules}
      renderItem={({item}) => renderModuleButton(item)}
    />
  )
}

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    list: {
      paddingVertical: theme.size.spacing.md,
    },
  })
