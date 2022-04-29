import React, {createElement, useState} from 'react'
import {Theme, useThemable} from '../../../themes'
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

export const SelectModules = () => {
  const [selectedModules, setSelectedModules] = useState<ModuleWithSelection[]>(
    initialSelectedModules,
  )

  // TODO Create `Icon` component with size and color props
  const IconProps = (selected: boolean) =>
    useThemable(createIconProps(selected))

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
                    {createElement(icons[slug], IconProps(selected))}
                    <Title
                      level="h5"
                      prominence={selected ? 1 : 2}
                      text={title}
                    />
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

const createIconProps = (selected: boolean) => (theme: Theme) => ({
  width: 24,
  aspectRatio: 1,
  fill: selected ? theme.color.text.default : theme.color.text.secondary,
})
