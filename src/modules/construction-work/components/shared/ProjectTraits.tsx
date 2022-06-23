import Location from '@amsterdam/asc-assets/static/icons/Location.svg'
import React from 'react'
import {View} from 'react-native'
import {Strides} from '@/assets/icons'
import {PleaseWait, Trait} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {useProjects} from '@/modules/construction-work/useProjects'
import {Theme, useThemable} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  projectId: string
}

export const ProjectTraits = ({projectId}: Props) => {
  const iconProps = useThemable(createIconProps)
  const {isLoadingProjectByDistance, projectByDistance} = useProjects({
    projectId,
  })

  if (isLoadingProjectByDistance) {
    return <PleaseWait />
  }

  if (!projectByDistance) {
    return null
  }
  const {meter, strides} = projectByDistance

  return (
    <View
      accessibilityLabel={accessibleText(
        [
          meter && `${meter} meter`,
          meter && strides && 'of',
          strides && `${strides} stappen`,
          'vanaf uw adres',
        ].join(' '),
      )}>
      <Row gutter="md" wrap>
        {meter && (
          <Trait icon={<Location {...iconProps} />} label={`${meter} meter`} />
        )}
        {strides && (
          <Trait
            icon={<Strides {...iconProps} />}
            label={`${strides} stappen`}
          />
        )}
      </Row>
    </View>
  )
}

const createIconProps = ({color}: Theme) => ({
  fill: color.text.default,
})
