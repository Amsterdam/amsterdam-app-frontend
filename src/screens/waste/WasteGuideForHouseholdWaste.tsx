import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Title,
} from '../../components/ui'
import {formatSentence} from '../../utils'
import {WasteGuideDetails} from './WasteGuideByAddress'

type Props = {
  properties: WasteGuideDetails
}

export const WasteGuideForHouseholdWaste = ({properties}: Props) => {
  const {collectionDays, howToOffer, remark, whenToPutOut} = properties

  return (
    <Card>
      <CardHeader>
        <Title level={4} text="Restafval" />
      </CardHeader>
      <CardBody>
        <DescriptionList
          items={[
            {
              label: 'Hoe',
              value: howToOffer,
            },
            {
              label: collectionDays.includes(' en ')
                ? 'Ophaaldagen'
                : 'Ophaaldag',
              value: formatSentence(collectionDays),
            },
            {
              label: 'Buiten zetten',
              value: whenToPutOut,
            },
            {
              label: 'Opmerking',
              value: remark && formatSentence(remark),
            },
          ]}
        />
      </CardBody>
    </Card>
  )
}
