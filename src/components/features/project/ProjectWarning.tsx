import Email from '@amsterdam/asc-assets/static/icons/Email.svg'
import {useNavigation} from '@react-navigation/native'
import React, {useLayoutEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import HeroImage from '../../../assets/images/warning-hero.svg'
import {useGetProjectQuery, useGetProjectWarningQuery} from '../../../services'
import {color} from '../../../tokens'
import {formatDate, formatTime, openMailUrl} from '../../../utils'
import {
  Box,
  Button,
  NonScalingHeaderTitle,
  PleaseWait,
  Text,
  Title,
} from '../../ui'
import {Row, ScrollView} from '../../ui/layout'
import {useNotificationState} from '../notifications'

type Props = {
  id: string
}

export const ProjectWarning = ({id}: Props) => {
  const navigation = useNavigation()
  const notificationState = useNotificationState()

  const {data: warning, isLoading: warningIsLoading} =
    useGetProjectWarningQuery({id})

  const {data: project, isLoading: projectIsLoading} = useGetProjectQuery(
    {
      id: warning?.project_identifier!,
    },
    {skip: !warning},
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <NonScalingHeaderTitle text={project?.title ?? ''} />,
    })
  })

  if (warningIsLoading || projectIsLoading || !warning) {
    return <PleaseWait />
  }

  notificationState.markAsRead(warning.identifier)

  return (
    <ScrollView>
      <View style={styles.image}>
        <HeroImage />
      </View>
      <Box background="white">
        <Text margin secondary>
          {formatDate(warning.publication_date)}{' '}
          {formatTime(warning.publication_date)}
        </Text>
        <Title margin text={warning.title} />
        <Text intro margin>
          {warning.body.preface}
        </Text>
        <Text margin>{warning.body.content}</Text>
      </Box>
      <Box>
        <Box background="white">
          <Row>
            <Button
              icon={<Email fill={color.font.inverse} />}
              onPress={() => openMailUrl(warning.author_email)}
              text={warning.author_email}
            />
          </Row>
        </Box>
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    aspectRatio: 378 / 167,
  },
})
