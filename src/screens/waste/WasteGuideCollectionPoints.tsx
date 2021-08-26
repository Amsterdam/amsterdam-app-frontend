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

export const WasteGuideCollectionPoints = () => (
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
      <Link
        direction="forward"
        emphasis
        onPress={() => {}}
        text="Bekijk de kaart met afvalpunten in de buurt"
      />
      <Gutter height={size.spacing.md} />
      <Text secondary>(Kaart komt hier.)</Text>
    </CardBody>
  </Card>
)
