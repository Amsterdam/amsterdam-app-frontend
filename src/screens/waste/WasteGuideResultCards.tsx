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

export const WasteGuideResultCards = () => (
  <>
    <Card>
      <CardHeader>
        <Title level={4} text="Grof afval" />
      </CardHeader>
      <CardBody>
        <Text secondary>Ophaaldag</Text>
        <Text>Maandag</Text>
        <Gutter height={size.spacing.md} />
        <Text secondary>Buitenzetten</Text>
        <Text>Zondag vanaf 21.00 uur tot maandag 07.00 uur</Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Naast de container of naar een afvalpunt?"
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
          Op een afhaalpunt kunt u gratis uw grof afval, klein chemisch afval en
          spullen voor de kringloop kwijt.
        </Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Bekijk de kaart met afvalpunten in de buurt"
        />
        <Gutter height={size.spacing.sm} />
        <Text>(Kaart komt hier.)</Text>
      </CardBody>
    </Card>
    <Gutter height={size.spacing.md} />
    <Card>
      <CardHeader>
        <Title level={4} text="Restafval" />
      </CardHeader>
      <CardBody>
        <Text secondary>Hoe</Text>
        <Text>Breng uw restafval naar een container voor restafval.</Text>
        <Gutter height={size.spacing.md} />
        <Title
          level={4}
          text="&gt; Bekijk de kaart met containers in de buurt"
        />
        <Gutter height={size.spacing.sm} />
        <Text>(Kaart komt hier.)</Text>
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
        <Gutter height={size.spacing.sm} />
        <Text>(Kaart komt hier.)</Text>
      </CardBody>
    </Card>
    <Gutter height={size.spacing.md} />
    <Title level={4} text="&gt; Kloppen de dagen of tijden niet?" />
  </>
)
