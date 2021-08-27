import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Title,
} from '../../components/ui'
import {WasteGuideFeature} from './WasteGuideByAddress'
import {buitenZetten, ophaaldag} from './wasteGuideUtils'

export const WasteGuideForHouseholdWaste = ({
  properties,
}: WasteGuideFeature) => (
  <Card>
    <CardHeader>
      <Title level={4} text="Restafval" />
    </CardHeader>
    <CardBody>
      <DescriptionList
        items={[
          {
            label: 'Hoe',
            value: properties.aanbiedwijze,
          },
          {
            label: 'Ophaaldag',
            value: ophaaldag(properties.ophaaldag, properties.frequentie),
          },
          {
            label: 'Buiten zetten',
            value: buitenZetten(properties.tijd_vanaf, properties.tijd_tot),
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
