import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Title,
} from '../../components/ui'
import {formatDateTimes, formatSentence} from '../../utils'
import {WasteGuideFeature} from './WasteGuideByAddress'

export const WasteGuideForBulkyWaste = ({properties}: WasteGuideFeature) => (
  <Card>
    <CardHeader>
      <Title level={4} text="Grof afval" />
    </CardHeader>
    <CardBody>
      <DescriptionList
        items={[
          {
            label: properties.ophaaldag.includes(' en ')
              ? 'Ophaaldagen'
              : 'Ophaaldag',
            value: formatSentence(properties.ophaaldag),
          },
          {
            label: 'Buiten zetten',
            value: formatSentence(
              formatDateTimes(
                properties.ophaaldag,
                properties.tijd_vanaf,
                'aanbiedtijden onbekend',
                'ophaaldagen onbekend',
                properties.tijd_tot,
              ),
            ),
          },
          {
            label: 'Opmerking',
            value: properties.opmerking,
          },
        ]}
      />
    </CardBody>
  </Card>
)
