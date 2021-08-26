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

export const WasteGuideContainers = () => (
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
      <Link
        emphasis
        onPress={() => {}}
        text="&gt; Bekijk de kaart met containers in de buurt"
      />
      <Gutter height={size.spacing.md} />
      <Text secondary>(Kaart komt hier.)</Text>
    </CardBody>
  </Card>
)
