import React from 'react'
import {useSelector} from 'react-redux'
import {clientModules} from '../../../modules'
import {ServerModule} from '../../../modules/types'
import {color} from '../../../tokens'
import {combineClientAndServerModules} from '../../../utils'
import {Box} from '../../ui'
import mock from './mock.json'
import {selectModules} from './modulesSlice'
import {icons, ModuleButton} from './'

const modules = combineClientAndServerModules(clientModules, mock.modules)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const Modules = () => {
  const {modules: storedModules} = useSelector(selectModules)
  const serverModules: ServerModule[] = mock.modules.filter(
    m => m.status === 1 && storedModules.includes(m.slug),
  )
  console.log(serverModules)
  return (
    <Box insetVertical="md">
      {modules.map(({icon, name, slug, title}) => {
        const Icon = icons[icon]

        return (
          <ModuleButton
            icon={<Icon {...iconProps} />}
            key={slug}
            label={title}
            name={name}
          />
        )
      })}
    </Box>
  )
}
