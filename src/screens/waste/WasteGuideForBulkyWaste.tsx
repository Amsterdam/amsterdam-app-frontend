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

export const WasteGuideForBulkyWaste = ({properties}: WasteGuideFeature) => (
  <>
    <Card>
      <CardHeader>
        <Title level={4} text="Grof afval" />
      </CardHeader>
      <CardBody>
        <Text secondary>Ophaaldag</Text>
        <Text>{properties.ophaaldag}</Text>
        <Gutter height={size.spacing.md} />
        <Text secondary>Buitenzetten</Text>
        <Text>
          {properties.tijd_vanaf} tot {properties.tijd_tot?.toLowerCase()}
        </Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Grof afval: Langs de weg of naar een afvalpunt?"
        />
      </CardBody>
    </Card>
    <Gutter height={size.spacing.md} />
    <Card>
      <CardHeader>
        <Title level={4} text="Afvalpunten" />
      </CardHeader>
      <CardBody>
        <Text>
          Op een Afvalpunt kunt u gratis uw grof afval, klein chemisch afval en{' '}
          spullen voor de kringloop kwijt.
        </Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Bekijk de kaart met afvalpunten in de buurt"
        />
        <Gutter height={size.spacing.md} />
        <Text secondary>(Kaart komt hier.)</Text>
      </CardBody>
    </Card>
  </>
)
