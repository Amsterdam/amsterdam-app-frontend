import {Pressable} from '_components/ui/buttons'
import React, {SVGProps} from 'react'
import {CityOffice as CityOfficeIcon} from '@/assets/icons'
import {Box} from '@/components/ui'
import {Row} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {Title} from '@/components/ui/text'
import {CityOffice} from '@/modules/contact/types'
import {Theme, useThemable} from '@/themes'

type Props = {
  cityOffice: CityOffice
}

export const CityOfficeButton = ({cityOffice}: Props) => {
  const iconProps = useThemable(createIconProps)

  return (
    <Pressable>
      <Box>
        <Row gutter="md">
          <Icon size={24}>
            <CityOfficeIcon {...iconProps} />
          </Icon>
          <Title color="link" level="h5" text={cityOffice.title} />
        </Row>
      </Box>
    </Pressable>
  )
}

const createIconProps = ({color}: Theme): SVGProps<unknown> => ({
  fill: color.text.link,
})
