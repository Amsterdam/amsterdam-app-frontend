import React from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  Title,
} from '../../components/ui'
import {WasteGuideDetails} from './types'

type Props = {
  details: WasteGuideDetails
}

export const WasteGuideForHouseholdWaste = ({details}: Props) => {
  const {collectionDays, howToOffer, remark, whenToPutOut} = details

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
              label: collectionDays?.includes(' en ')
                ? 'Ophaaldagen'
                : 'Ophaaldag',
              value: collectionDays,
            },
            {
              label: 'Buiten zetten',
              value: whenToPutOut,
            },
            {
              label: 'Opmerking',
              value: remark,
            },
          ]}
        />
      </CardBody>
    </Card>
  )
}
