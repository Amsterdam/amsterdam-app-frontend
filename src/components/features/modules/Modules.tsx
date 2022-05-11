import React from 'react'
import {modules} from '../../../modules'
import {color} from '../../../tokens'
import {Box} from '../../ui'
import {icons, ModuleButton} from './'

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const Modules = () => (
  <Box insetVertical="md">
    {modules.map(({icon, name, title}) => {
      const Icon = icons[icon]

      return (
        <ModuleButton
          icon={<Icon {...iconProps} />}
          key={name}
          label={title}
          name={name}
        />
      )
    })}
  </Box>
)
