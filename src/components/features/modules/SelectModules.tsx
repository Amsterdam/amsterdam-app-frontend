import React, {createElement, useState} from 'react'
import {color} from '../../../tokens'
import {Box} from '../../ui'
import {Column} from '../../ui/layout'
import mock from './mock.json'
import {icons, Module, ModuleSwitch} from './'

type ModuleWithSelection = Module & {
  selected: boolean
}

// TODO Retrieve from store
const initialSelectedModules: ModuleWithSelection[] = mock.modules.map(m => ({
  ...m,
  selected: !['open-waste-container', 'city-offices'].includes(m.slug),
}))

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const SelectModules = () => {
  const [selectedModules, setSelectedModules] = useState<ModuleWithSelection[]>(
    initialSelectedModules,
  )

  // TODO Save to store
  const handleValueChange = (value: boolean, module: Module) => {
    setSelectedModules(
      selectedModules.map(m =>
        m.slug === module.slug ? {...m, selected: value} : m,
      ),
    )
  }

  return (
    <Box>
      <Column gutter="sm">
        {selectedModules.map(module => {
          const {selected, slug, title} = module

          return (
            <ModuleSwitch
              icon={createElement(icons[slug], iconProps)}
              key={`${slug}-module-switch`}
              label={title}
              onValueChange={value => handleValueChange(value, module)}
              value={selected}
            />
          )
        })}
      </Column>
    </Box>
  )
}
