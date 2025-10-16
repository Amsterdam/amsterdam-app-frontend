import {type PropsWithChildren} from 'react'
import type {SvgIconName} from '@/components/ui/media/svgIcons'
import {SingleSelectable} from '@/components/ui/containers/SingleSelectable'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Icon} from '@/components/ui/media/Icon'
import {Title} from '@/components/ui/text/Title'
import {capitalizeString} from '@/utils/capitalizeString'

export const ParkingSessionDetailsRow = ({
  children,
  title,
  icon,
}: PropsWithChildren<{
  icon: Extract<
    SvgIconName,
    'clock' | 'parkingCar' | 'location' | 'euroCoinsInverted'
  >
  title: string
}>) => (
  <SingleSelectable>
    <Row
      gutter="sm"
      valign="start">
      <Icon
        name={icon}
        size="lg"
        testID={`ParkingSessionDetails${capitalizeString(icon)}Icon`}
      />
      <Column
        gutter="xxs"
        halign="start">
        <Title
          level="h5"
          text={title}
        />
        {children}
      </Column>
    </Row>
  </SingleSelectable>
)
