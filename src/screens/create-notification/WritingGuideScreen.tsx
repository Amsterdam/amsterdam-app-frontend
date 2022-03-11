import Close from '@amsterdam/asc-assets/static/icons/Close.svg'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {TouchableOpacity} from 'react-native'
import {
  Box,
  Button,
  Text,
  TextInCircle,
  Title,
  ZebraList,
  ZebraListItemProps,
} from '../../components/ui'
import {Column, Gutter, Row, ScrollView} from '../../components/ui/layout'
import {color, font} from '../../tokens'
import {NotificationStackParams} from './CreateNotificationScreen'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'WritingGuide'>
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

const renderTip = ({index, text}: ZebraListItemProps) => (
  <Row gutter="md" valign="center">
    <TextInCircle fontSize={font.size.h3} label={index.toString()} />
    <Text>{text}</Text>
  </Row>
)

export const WritingGuideScreen = ({navigation}: Props) => (
  <>
    <Row align="end">
      <Box>
        <TouchableOpacity
          accessibilityLabel="Sluiten"
          accessibilityRole="button"
          onPress={navigation.goBack}>
          <Close fill={color.font.regular} height={20} width={20} />
        </TouchableOpacity>
      </Box>
    </Row>
    <ScrollView>
      <Column align="between">
        <Box insetHorizontal="md">
          <Title text="Schrijftips" />
        </Box>
        <Gutter height="md" />
        <ZebraList data={tips} renderItem={renderTip} />
        <Box>
          <Button onPress={navigation.goBack} text="Aan de slag!" />
        </Box>
      </Column>
      <Gutter height="md" />
    </ScrollView>
  </>
)
