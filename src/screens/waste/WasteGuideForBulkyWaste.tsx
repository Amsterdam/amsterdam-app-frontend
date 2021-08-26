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

export const WasteGuideForBulkyWaste = ({properties}: WasteGuideFeature) => {
  const cardContent: DescriptionListItem[] = [
    {
      label: 'Ophaaldag',
      value:
        properties.ophaaldag &&
        [properties.ophaaldag, properties.frequentie].join(', '),
    },
    {
      label: 'Buiten zetten',
      value:
        properties.tijd_vanaf &&
        properties.tijd_tot &&
        properties.tijd_vanaf + ' tot ' + properties.tijd_tot?.toLowerCase(),
    },
    {
      label: 'Opmerking',
      value: properties.opmerking,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Grof afval" />
      </CardHeader>
      <CardBody>
        <DescriptionList items={cardContent} />
      </CardBody>
    </Card>
  )
}
