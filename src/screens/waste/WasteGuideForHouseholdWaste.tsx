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

export const WasteGuideForHouseholdWaste = ({
  properties,
}: WasteGuideFeature) => (
  <Card>
    <CardHeader>
      <Title level={4} text="Restafval" />
    </CardHeader>
    <CardBody>
      <Text secondary small>
        Hoe
      </Text>
      <Text>{properties.aanbiedwijze}</Text>
      <Gutter height={size.spacing.md} />
      <Title level={4} text="&gt; Bekijk de kaart met containers in de buurt" />
    </CardBody>
  </Card>
)
