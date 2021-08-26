import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Gutter,
  Link,
  Text,
  Title,
} from '../../components/ui'
import {size} from '../../tokens'
import {WasteGuideFeature} from './WasteGuideByAddress'

export const WasteGuideForBulkyWaste = ({properties}: WasteGuideFeature) => (
  <Card>
    <CardHeader>
      <Title level={4} text="Grof afval" />
    </CardHeader>
    <CardBody>
      <Text secondary small>
        Ophaaldag
      </Text>
      <Text>{properties.ophaaldag}</Text>
      <Gutter height={size.spacing.md} />
      <Text secondary small>
        Buitenzetten
      </Text>
      <Text>
        {properties.tijd_vanaf} tot {properties.tijd_tot?.toLowerCase()}
      </Text>
      <Gutter height={size.spacing.md} />
      <Link
        direction="forward"
        emphasis
        onPress={() => {}}
        text="Grof afval: Langs de weg of naar een afvalpunt?"
      />
    </CardBody>
  </Card>
)
