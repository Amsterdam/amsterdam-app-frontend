import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {EmptyMessage} from '@/components/ui/feedback'
import {Column, Row} from '@/components/ui/layout'
import {ModuleSlug} from '@/modules/slugs'
import {WasteGuideRouteName} from '@/modules/waste-guide/routes'

export const WasteGuideNotFound = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RootStackParams, typeof ModuleSlug['waste-guide']>
    >()

  return (
    <Column gutter="lg">
      <EmptyMessage text="We hebben geen afvalinformatie gevonden voor dit adres." />
      <Row align="start">
        <Button
          label="Dit klopt niet"
          onPress={() =>
            navigation.navigate(WasteGuideRouteName.wasteGuideFeedback)
          }
        />
      </Row>
    </Column>
  )
}
