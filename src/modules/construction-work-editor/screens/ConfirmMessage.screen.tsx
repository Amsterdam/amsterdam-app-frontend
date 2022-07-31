import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import HeroImage from '@/assets/images/project-warning-hero.svg'
import {Alert, Box} from '@/components/ui'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Checkbox} from '@/components/ui/forms'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Phrase, Title} from '@/components/ui/text'
import {
  clearDraft,
  selectCurrentProjectId,
  selectMainImage,
  selectMainImageDescription,
  selectMessage,
  selectProject,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {
  useAddProjectWarningImageMutation,
  useAddProjectWarningMutation,
} from '@/modules/construction-work-editor/services'
import {useAddNotificationMutation} from '@/services'
import {resetAlert, setAlert} from '@/store'
import {Theme, useThemable} from '@/themes'
import {Variant} from '@/types'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.confirmMessage
  >
}

export const ConfirmMessageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const [hasAlert, setHasAlert] = useState(true)
  const [isPushNotificationChecked, setPushNotificationChecked] =
    useState(false)
  const currentProjectId = useSelector(selectCurrentProjectId)
  const message = useSelector(selectMessage(currentProjectId))
  const mainImage = useSelector(selectMainImage(currentProjectId))
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )
  const project = useSelector(selectProject(currentProjectId))
  const styles = useThemable(createStyles)

  const [addWarning] = useAddProjectWarningMutation()
  const [addProjectWarningImage] = useAddProjectWarningImageMutation()
  const [addNotification] = useAddNotificationMutation()

  useLayoutEffect(() => {
    project &&
      navigation.setOptions({
        headerTitle: project.title,
      })
  }, [navigation, project])

  const onSubmit = async () => {
    if (!message) {
      return
    }
    dispatch(resetAlert())
    try {
      const warningResponse = await addWarning(message).unwrap()

      if (mainImage?.data) {
        await addProjectWarningImage({
          project_warning_id: warningResponse.warning_identifier,
          image: {
            main: true,
            description: mainImageDescription ?? 'Vervangende afbeelding',
            data: mainImage.data,
          },
        })
      }

      if (
        !!isPushNotificationChecked &&
        !!project?.title &&
        !!project.id &&
        !!message.title
      ) {
        await addNotification({
          title: project.title,
          body: message.title,
          project_identifier: project.id,
          warning_identifier: warningResponse.warning_identifier,
        })
      }

      dispatch(clearDraft())

      // Before we navigate to the screen where the Alert (showSuccesfullySendMessageAlert)
      // is shown, we have to remove the Alert in this component
      setHasAlert(false)

      navigation.popToTop()
      dispatch(
        setAlert({
          content: {
            title: 'Gelukt',
            text: 'Uw bericht is geplaatst.',
          },
          variant: Variant.success,
          isVisible: true,
        }),
      )
    } catch (error: unknown) {
      dispatch(
        setAlert({
          content: {
            title: 'Niet gelukt',
            text: 'Het bericht opslaan is niet gelukt. Probeer het nog eens.',
          },
          variant: Variant.failure,
          isVisible: true,
        }),
      )
    }
  }

  const image = (
    <Column gutter="sm">
      {mainImage ? (
        <Image source={{uri: mainImage?.path}} />
      ) : (
        <View style={styles.placeholder}>
          <HeroImage />
        </View>
      )}
      {!!mainImageDescription && <Paragraph>{mainImageDescription}</Paragraph>}
    </Column>
  )

  return (
    <Screen
      scroll
      stickyHeader={!!hasAlert && <Alert />}
      stickyFooter={
        <>
          <Box>
            <Button label="Plaats bericht" onPress={onSubmit} />
          </Box>
          <Row align="between" valign="center">
            <NavigationButton
              direction="backward"
              iconSize={16}
              label="Vorige"
              onPress={navigation.goBack}
            />
          </Row>
        </>
      }>
      <Box>
        <Column gutter="lg">
          <Column gutter="md">
            <Title text="Controleer" />
            {image}
          </Column>
          <Column gutter="sm">
            {!!message?.title && <Title text={message.title} />}
            {!!message?.body && <Paragraph>{message.body}</Paragraph>}
          </Column>
          {!!project?.title && !!message?.title && (
            <Column gutter="sm">
              <Checkbox
                accessibilityLabel="Wil je ook een pushbericht versturen?"
                label={<Phrase>Wil je ook een pushbericht versturen?</Phrase>}
                onValueChange={() =>
                  setPushNotificationChecked(!isPushNotificationChecked)
                }
                value={isPushNotificationChecked}
              />
              {!!isPushNotificationChecked && (
                <Column gutter="xs">
                  <Phrase fontWeight="bold">{project.title}</Phrase>
                  <Phrase>{message.title}</Phrase>
                </Column>
              )}
            </Column>
          )}
        </Column>
      </Box>
    </Screen>
  )
}

const createStyles = ({media}: Theme) =>
  StyleSheet.create({
    placeholder: {
      aspectRatio: media.aspectRatio.wide,
    },
  })
