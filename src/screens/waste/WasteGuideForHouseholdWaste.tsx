import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  DescriptionListItem,
  Title,
} from '../../components/ui'
import {WasteGuideFeature} from './WasteGuideByAddress'
import {buitenZetten, ophaaldag, opmerking} from './wasteGuideUtils'

export const WasteGuideForHouseholdWaste = ({
  properties,
}: WasteGuideFeature) => {
  const cardContent: DescriptionListItem[] = [
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
      value: opmerking(properties.opmerking),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Restafval" />
      </CardHeader>
      <CardBody>
        <DescriptionList items={cardContent} />
      </CardBody>
    </Card>
  )
}
