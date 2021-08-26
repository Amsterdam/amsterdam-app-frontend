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

export const WasteGuideForHouseholdWaste = ({
  properties,
}: WasteGuideFeature) => {
  const cardContent: CardContent[] = [
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
