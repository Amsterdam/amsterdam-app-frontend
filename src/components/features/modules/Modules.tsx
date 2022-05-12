import React from 'react'
import {clientModules} from '../../../modules'
import {ServerModule} from '../../../modules/types'
import {color} from '../../../tokens'
import {combineClientAndServerModules} from '../../../utils'
import {Box} from '../../ui'
import mock from './mock.json'
import {icons, ModuleButton} from './'

// TODO Retrieve from store
const serverModules: ServerModule[] = mock.modules.filter(m => m.status === 1)
const modules = combineClientAndServerModules(clientModules, serverModules)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const Modules = () => (
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
