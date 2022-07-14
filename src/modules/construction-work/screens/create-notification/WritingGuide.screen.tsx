import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useMemo} from 'react'
import {
  Box,
  SingleSelectable,
  Text,
  TextInCircle,
  Title,
  ZebraList,
  ZebraListItemProps,
} from '@/components/ui'
import {Button, IconButton} from '@/components/ui/buttons'
import {Column, Gutter, Row, Screen, ScrollView} from '@/components/ui/layout'
import {Icon} from '@/components/ui/media'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'
import {useTheme} from '@/themes'
import {accessibleText} from '@/utils'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

const tips = [
  'Behandel één onderwerp per bericht. Splits anders op in meerdere berichten.',
  'Zorg dat je bericht vragen wegneemt, in plaats van dat het vragen oproept.',
  'Zet het belangrijkste bovenaan.',
  'Gebruik korte zinnen.',
  'Gebruik geen jargon en moeilijke woorden.',
  'Schrijf actief. Niet: ‘De weg wordt afgesloten’, maar: ‘We sluiten de weg af’.',
  'Spreek mensen aan met ‘u’.',
  'Geen spoed maar wel belangrijk? Overleg met de redactie over een nieuwsbericht op de website.',
]

const renderTip =
  (fontSize: number) =>
  ({index, text}: ZebraListItemProps) =>
    (
      <SingleSelectable label={accessibleText(index.toString(), text)}>
        <Row gutter="md" valign="center">
          <TextInCircle fontSize={fontSize} label={index.toString()} />
          <Text>{text}</Text>
        </Row>
      </SingleSelectable>
    )

export const WritingGuideScreen = ({navigation}: Props) => {
  const {color, text} = useTheme()

  const RenderTip = useMemo(
    () => renderTip(text.fontSize.h3),
    [text.fontSize.h3],
  )

  return (
    <Screen>
      <Row align="end">
        <Box>
          <IconButton
            accessibilityLabel="Sluiten"
            icon={
              <Icon size={20}>
                <Close fill={color.text.default} />
              </Icon>
            }
            onPress={navigation.goBack}
          />
        </Box>
      </Row>
      <ScrollView>
        <Column align="between">
          <Box insetHorizontal="md">
            <Title text="Schrijftips" />
          </Box>
          <Gutter height="md" />
          <ZebraList data={tips} renderItem={RenderTip} />
          <Box>
            <Button label="Aan de slag!" onPress={navigation.goBack} />
          </Box>
        </Column>
        <Gutter height="md" />
      </ScrollView>
    </Screen>
  )
}
