import React from 'react'
import {Attention, Box, PleaseWait} from '@/components/ui'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Paragraph, Phrase} from '@/components/ui/text'
import {ModuleButton} from '@/modules/home/components'
import {icons} from '@/modules/home/config'
import {useModules} from '@/modules/home/hooks'
import {useTheme} from '@/themes'

export const Modules = () => {
  const {color} = useTheme()
  const {getSelectedModules, isLoadingModules} = useModules()
  const modules = getSelectedModules()

  if (isLoadingModules) {
    return <PleaseWait />
  }

  if (!modules) {
    return (
      <Box insetHorizontal="md" insetVertical="xxxl">
        <Attention warning>
          <Phrase fontWeight="bold">Fout</Phrase>
          <Paragraph variant="small">Modules worden niet geladen.</Paragraph>
        </Attention>
      </Box>
    )
  }

  if (!modules.length) {
    return (
      <Box insetHorizontal="md" insetVertical="xxxl">
        <EmptyMessage
          text="Alle modules staan uit. Daardoor is hier niet veel te doen.
          Zet één of meer modules aan via de instellingen rechtsboven."
        />
      </Box>
    )
  }

  return (
    <Box grow>
      <Column gutter="md">
        {modules.map(({icon, slug, title}) => {
          const ModuleIcon = icons[icon]
          return (
            <ModuleButton
              icon={
                !!ModuleIcon && (
                  <Icon size={24}>
                    <ModuleIcon fill={color.text.default} />
                  </Icon>
                )
              }
              key={slug}
              label={title}
              slug={slug}
            />
          )
        })}
      </Column>
    </Box>
  )
}
