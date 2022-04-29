import React, {createElement, useState} from 'react'
import {color} from '../../../tokens'
import {Box} from '../../ui'
import {Switch} from '../../ui/forms'
import {Column, Row} from '../../ui/layout'
import {Title} from '../../ui/typography'
import mock from './mock.json'
import {icons, Module, ModuleBox} from './'

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
  const onChangeSelection = (module: Module, selected: boolean) => {
    setSelectedModules(
      selectedModules.map(m => (m.slug === module.slug ? {...m, selected} : m)),
    )
  }

  return (
    <Box>
      <Column gutter="sm">
        {selectedModules.map(module => {
          const {selected, slug, title} = module

          return (
            <ModuleBox key={slug} selected={selected}>
              <Switch
                label={
                  <Row gutter="md" valign="center">
                    {createElement(icons[slug], iconProps)}
                    <Title level="h5" text={title} />
                  </Row>
                }
                onValueChange={value => onChangeSelection(module, value)}
                value={selected}
              />
            </ModuleBox>
          )
        })}
      </Column>
    </Box>
  )
}
