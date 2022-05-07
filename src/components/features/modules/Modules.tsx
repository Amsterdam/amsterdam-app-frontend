import React, {createElement} from 'react'
import {color} from '../../../tokens'
import {Box} from '../../ui'
import mock from './mock.json'
import {icons, Module, ModuleButton} from './'

// TODO Retrieve from store
const modules: Module[] = mock.modules.filter(m => m.status === 1)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const Modules = () => (
  <Box insetVertical="md">
    {modules.map(({slug, title}) => (
      <ModuleButton
        icon={createElement(icons[slug], iconProps)}
        key={slug}
        label={title}
        slug={slug}
      />
    ))}
  </Box>
)
