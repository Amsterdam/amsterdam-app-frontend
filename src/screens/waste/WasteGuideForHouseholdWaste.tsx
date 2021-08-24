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
  <>
    <Card>
      <CardHeader>
        <Title level={4} text="Restafval" />
      </CardHeader>
      <CardBody>
        <Text secondary>Hoe</Text>
        <Text>{properties.aanbiedwijze}</Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Bekijk de kaart met containers in de buurt"
        />
      </CardBody>
    </Card>
    <Gutter height={size.spacing.md} />
    <Card>
      <CardHeader>
        <Title level={4} text="Containers in de buurt" />
      </CardHeader>
      <CardBody>
        <Text>
          Zoekt u een container voor glas, papier, textiel, plastic verpakkingen
          of restafval?
        </Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Bekijk de kaart met containers in de buurt"
        />
        <Gutter height={size.spacing.md} />
        <Text secondary>(Kaart komt hier.)</Text>
      </CardBody>
    </Card>
  </>
)
