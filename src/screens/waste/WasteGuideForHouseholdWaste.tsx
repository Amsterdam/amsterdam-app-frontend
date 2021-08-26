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
      value: properties.ophaaldag,
    },
    {
      label: 'Opmerking',
      value: properties.opmerking,
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
