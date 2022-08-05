import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {RootStackParams} from '@/app/navigation'
import {Box} from '@/components/ui'
import {Button} from '@/components/ui/buttons'
import {Column} from '@/components/ui/layout'
import {Paragraph} from '@/components/ui/text'
import {module as constructionWorkEditorModule} from '@/modules/construction-work-editor'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {openMailUrl} from '@/utils'

export const ContactConstructionWorkSupport = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<
        RootStackParams,
        typeof constructionWorkEditorModule.slug
      >
    >()

  return (
    <Box insetHorizontal="md">
      <Column gutter="sm">
        <Paragraph>Ontbreekt er een bouwproject?</Paragraph>
        <Button
          label="Neem contact op met de redactie"
          onPress={() => openMailUrl('redactieprojecten@amsterdam.nl')}
          variant="secondary"
        />
        <Button
          label="Schrijftips"
          onPress={() =>
            navigation.navigate(ConstructionWorkEditorRouteName.writingGuide)
          }
        />
      </Column>
    </Box>
  )
}
