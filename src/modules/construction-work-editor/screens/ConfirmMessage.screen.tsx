import {StackNavigationProp} from '@react-navigation/stack'
import {useLayoutEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Button} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Alert} from '@/components/ui/feedback'
import {
  AlertCloseType,
  AlertVariant,
} from '@/components/ui/feedback/Alert.types'
import {Checkbox} from '@/components/ui/forms'
import {Column, Row, Screen} from '@/components/ui/layout'
import {FigureWithFacadesBackground, Image} from '@/components/ui/media'
import {Link, Paragraph, Phrase, Title} from '@/components/ui/text'
import {ProjectWarningFallbackImage} from '@/modules/construction-work/assets/images'
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
import {useTheme} from '@/themes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.confirmMessage
  >
}

export const ConfirmMessageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const [isPushNotificationChecked, setPushNotificationChecked] =
    useState(false)
  const currentProjectId = useSelector(selectCurrentProjectId)
  const message = useSelector(selectMessage(currentProjectId))
  const mainImage = useSelector(selectMainImage(currentProjectId))
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )
  const project = useSelector(selectProject(currentProjectId))

  const [addWarning] = useAddProjectWarningMutation()
  const [addProjectWarningImage] = useAddProjectWarningImageMutation()
  const [addNotification] = useAddNotificationMutation()

  const {media} = useTheme()

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
        }).unwrap()
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
        }).unwrap()
      }

      dispatch(clearDraft())

      navigation.navigate(ConstructionWorkEditorRouteName.authorizedProjects, {
        showSuccessfullySentMessageAlert: true,
      })
    } catch (error: unknown) {
      dispatch(
        setAlert({
          closeType: AlertCloseType.withoutButton,
          content: {
            title: 'Niet gelukt',
            text: 'Het bericht opslaan is niet gelukt. Probeer het nog eens.',
          },
          variant: AlertVariant.negative,
          withIcon: false,
        }),
      )
    }
  }

  const image = (
    <Column gutter="sm">
      {mainImage ? (
        <Image source={{uri: mainImage?.path}} />
      ) : (
        <FigureWithFacadesBackground
          height={media.figureHeight.md}
          Image={<ProjectWarningFallbackImage />}
          imageAspectRatio={media.imageAspectRatio.projectWarningFallback}
        />
      )}
      {!!mainImageDescription && <Paragraph>{mainImageDescription}</Paragraph>}
    </Column>
  )

  return (
    <Screen
      scroll
      stickyFooter={
        <>
          <Box>
            <Column gutter="md">
              <Button label="Plaats bericht" onPress={onSubmit} />
              <Row align="between" valign="center">
                <Link
                  label="Vorige"
                  onPress={navigation.goBack}
                  variant="backward"
                />
              </Row>
            </Column>
          </Box>
        </>
      }
      stickyHeader={<Alert />}>
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
                  <Title level="h5" text={project.title} />
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
