import React from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {Box, Button, Image, PleaseWait, Text} from '../../../components/ui'
import {ScrollView} from '../../../components/ui/layout'
import {Theme, useThemable} from '../../../themes'
import {color} from '../../../tokens'
import {Module} from '../../types'
import {icons} from '../config'
import {useModules} from '../hooks'
import {HomeRouteName, HomeStackParams} from '../routes'
import {ModuleButton} from './ModuleButton'

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
      slug={slug}
      label={title}
      name={name}
    />
  )
}

export const Modules = () => {
  const {color} = useTheme()

  const {getSelectedModules, isLoadingModules} = useModules()
  const modules = getSelectedModules()

  if (isLoadingModules) {
    return <PleaseWait />
  }

  if (!modules?.length) {
    return (
      <Box insetHorizontal="md" insetVertical="xxxl">
        <Paragraph>
          Alle modules staan uit. Daardoor is hier niet veel te doen. Zet er
          snel één of meer weer aan via de instellingen rechtsboven.
        </Paragraph>
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {modules.map(({icon, name, slug, title}) => {
          const ModuleIcon = icons[icon]

          return (
            <ModuleButton
              icon={
                <Icon size={24}>
                  <ModuleIcon fill={color.text.default} />
                </Icon>
              }
              key={slug}
              slug={slug}
              label={title}
              name={name}
            />
          )
        })}
      </Column>
    </Box>
  )
}
