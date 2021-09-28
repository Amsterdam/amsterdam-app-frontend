import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext} from 'react'
import {StyleSheet, View} from 'react-native'
import {FormButtons} from '../../components/features/form'
import {Box, Button, Gutter, Link, Text, Title} from '../../components/ui'
import {FullSpaceContainer} from '../../components/ui/Layout/FullSpaceContainer'
import {Preview} from '../../components/ui/Preview'
import {color, size} from '../../tokens'
import {PushNotificationContext, PushNotificationStackParamList} from '.'

type Props = {
  navigation: StackNavigationProp<
    PushNotificationStackParamList,
    'VerifyNotification'
  >
}

export const VerifyNotificationScreen = ({navigation}: Props) => {
  const pushNotificationContext = useContext(PushNotificationContext)
  const {projectTitle} = pushNotificationContext.projectDetails
  const {newsDetails, notification, warning} = pushNotificationContext

  const handleSubmit = () => {
    console.log('submit')
  }

  return (
    <>
      <FullSpaceContainer>
        <Box>
          <Title margin text="Controleer" />
          <Text secondary>Project</Text>
          <Title level={2} text={projectTitle} />
          <Gutter height={size.spacing.md} />
          {notification && (
            <>
              <Preview label="Pushbericht">
                <Title level={2} text={notification.title} />
                <Gutter height={size.spacing.sm} />
                <Text>{notification.body}</Text>
              </Preview>
              <Gutter height={size.spacing.md} />
            </>
          )}
          {newsDetails && (
            <>
              <Text secondary>Nieuwsbericht</Text>
              <Gutter height={size.spacing.sm} />
              <View style={styles.newsTitle}>
                <Text>
                  Nieuwsbericht 2 met een hele lange uitgebreide titel
                </Text>
              </View>
              <Gutter height={size.spacing.md} />
            </>
          )}
          {warning && (
            <Preview label="Nieuwsbericht">
              <Title level={2} text={warning.title} />
              <Gutter height={size.spacing.sm} />
              <Text intro>{warning.body.preface}</Text>
              <Gutter height={size.spacing.sm} />
              <Text>{warning.body.content}</Text>
            </Preview>
          )}
        </Box>
      </FullSpaceContainer>
      <Box>
        <FormButtons>
          <Link
            direction="backward"
            onPress={navigation.goBack}
            text="Vorige"
          />
          <Button onPress={handleSubmit} text="Verstuur" variant="submit" />
        </FormButtons>
        <Gutter height={size.spacing.xl} />
      </Box>
    </>
  )
}

const styles = StyleSheet.create({
  newsTitle: {
    paddingVertical: size.spacing.md,
    borderColor: color.border.input,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
})
