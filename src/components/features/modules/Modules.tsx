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

const serverModules = mock.modules as ServerModule[]
const modules = combineClientAndServerModules(clientModules, serverModules)

const iconProps = {
  width: 24,
  aspectRatio: 1,
  fill: color.font.regular,
}

export const Modules = () => {
  const {modules: storedModuleSlugs} = useSelector(selectModules)
  const mockServerModules = serverModules
    .filter(m => m.status === 1)
    .filter(m => storedModuleSlugs.includes(m.slug))

  console.log({mockServerModules})

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
