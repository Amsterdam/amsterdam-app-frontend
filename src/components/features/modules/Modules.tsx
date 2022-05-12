import React from 'react'
import {ServerModule} from '../../../modules/types'
import {color} from '../../../tokens'
import {Box} from '../../ui'
import mock from './mock.json'
import {icons, ModuleButton} from './'

// TODO Retrieve from store
const modules: ServerModule[] = mock.modules.filter(m => m.status === 1)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const Modules = () => (
  <Box insetVertical="md">
    {modules.map(({icon, slug, title}) => {
      const Icon = icons[icon]

      return (
        <ModuleButton
          icon={<Icon {...iconProps} />}
          key={slug}
          label={title}
          slug={slug}
        />
      )
    })}
  </Box>
)
