import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Title,
} from '../../components/ui'
import {formatDateTimes, formatSentence} from '../../utils'
import {WasteGuideProperties} from './WasteGuideByAddress'

type Props = {
  properties: WasteGuideProperties
}

export const WasteGuideForHouseholdWaste = ({properties}: Props) => {
  const {aanbiedwijze, ophaaldag, tijd_vanaf, tijd_tot, opmerking} = properties

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Restafval" />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: 'Hoe',
              value: aanbiedwijze,
            },
            {
              label: ophaaldag.includes(' en ') ? 'Ophaaldagen' : 'Ophaaldag',
              value: formatSentence(ophaaldag),
            },
            {
              label: 'Buiten zetten',
              value: formatSentence(
                formatDateTimes(
                  ophaaldag,
                  tijd_vanaf,
                  'aanbiedtijden onbekend',
                  'ophaaldagen onbekend',
                  tijd_tot,
                ),
              ),
            },
            {
              label: 'Opmerking',
              value: opmerking && formatSentence(opmerking),
            },
          ]}
        />
      </CardBody>
    </Card>
  )
}
