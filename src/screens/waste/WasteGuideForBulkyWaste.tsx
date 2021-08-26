import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Text,
  Title,
} from '../../components/ui'
import {size} from '../../tokens'
import {WasteGuideFeature} from './WasteGuideByAddress'

type CardContent = {
  label: string
  value: string
}

export const WasteGuideForBulkyWaste = ({properties}: WasteGuideFeature) => {
  const cardContent: CardContent[] = [
    {
      label: 'Ophaaldag',
      value: properties.ophaaldag,
    },
    {
      label: 'Buiten zetten',
      value:
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
        {cardContent.map(
          (item, index) =>
            item.value && (
              <React.Fragment key={item.label}>
                <Text secondary small>
                  {item.label}
                </Text>
                <Text>{item.value}</Text>
                {index < cardContent.length - 1 && (
                  <Gutter height={size.spacing.md} />
                )}
              </React.Fragment>
            ),
        )}
      </CardBody>
    </Card>
  )
}
