import {type NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Checkbox} from '@/components/ui/forms/Checkbox'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {FigureWithFacadesBackground} from '@/components/ui/media/FigureWithFacadesBackground'
import {Image} from '@/components/ui/media/Image'
import {Link} from '@/components/ui/text/Link'
import {Paragraph} from '@/components/ui/text/Paragraph'
import {Phrase} from '@/components/ui/text/Phrase'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {useBoolean} from '@/hooks/useBoolean'
import ProjectWarningFallbackImage from '@/modules/construction-work/assets/images/project-warning-fallback.svg'
import {alerts} from '@/modules/construction-work-editor/alerts'
import {LoginBoundaryScreen} from '@/modules/construction-work-editor/components/LoginBoundaryScreen'
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
} from '@/modules/construction-work-editor/service'
import {useAlert} from '@/store/slices/alert'
import {escapeHtml} from '@/utils/escapeHtml'

type Props = NavigationProps<ConstructionWorkEditorRouteName.confirmMessage>

// Escape HTML and convert newlines to <br /> tags
const encodeBody = (input: string) => escapeHtml(input).replace(/\n/g, '<br />')

export const ConfirmMessageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const {resetAlert, setAlert} = useAlert()

  const {
    value: isPushNotificationChecked,
    toggle: togglePushNotificationChecked,
  } = useBoolean()
  const currentProjectId = useSelector(selectCurrentProjectId)
  const message = useSelector(selectMessage(currentProjectId))
  const mainImage = useSelector(selectMainImage(currentProjectId))
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )
  const project = useSelector(selectProject(currentProjectId))

  const [addWarning, {isLoading: isLoadingAddProjectWarning}] =
    useAddProjectWarningMutation()
  const [addWarningImage, {isLoading: isLoadingAddProjectWarningImage}] =
    useAddProjectWarningImageMutation()

  useSetScreenTitle()

  const onSubmit = async () => {
    if (!message) {
      return
    }

    resetAlert()

    try {
      const arg = {
        ...message,
        body: encodeBody(message.body),
        send_push_notification: isPushNotificationChecked,
      }

      if (mainImage) {
        const formData = new FormData()

        formData.append('image', {
          name:
            mainImage?.filename ??
            mainImage?.path.split('/')[mainImage?.path.split('/').length - 1],
          type: mainImage?.mime,
          uri: mainImage?.path.startsWith('file://')
            ? mainImage?.path
            : `file://${mainImage?.path}`,
        })
        const description = mainImageDescription ?? 'Vervangende afbeelding'

        formData.append('description', description)
        const {warning_image_id} = await addWarningImage(formData).unwrap()

        arg.warning_image = {
          id: warning_image_id,
          description,
        }
      }

      await addWarning(arg).unwrap()

      dispatch(clearDraft())

      navigation.navigate(ConstructionWorkEditorRouteName.authorizedProjects, {
        showSuccessfullySentMessageAlert: true,
      })
    } catch (error: unknown) {
      setAlert(alerts.saveMessageFailed)
    }
  }

  const image = (
    <Column gutter="sm">
      {mainImage ? (
        <Image source={{uri: mainImage?.path}} />
      ) : (
        <FigureWithFacadesBackground testID="ConstructionWorkEditorConfirmBackground">
          <ProjectWarningFallbackImage />
        </FigureWithFacadesBackground>
      )}
      {!!mainImageDescription && <Paragraph>{mainImageDescription}</Paragraph>}
    </Column>
  )

  return (
    <LoginBoundaryScreen
      hasStickyAlert
      scroll
      stickyFooter={
        <Box>
          <Column gutter="md">
            <Button
              disabled={
                isLoadingAddProjectWarning || isLoadingAddProjectWarningImage
              }
              label="Plaats bericht"
              onPress={onSubmit}
              testID="ConstructionWorkEditorCreateMessageSubmitButton"
            />
            <Row
              align="between"
              valign="center">
              <Link
                label="Vorige"
                onPress={navigation.goBack}
                testID="ConstructionWorkEditorCreateMessagePreviousButton"
                variant="backward"
              />
            </Row>
          </Column>
        </Box>
      }
      testID="ConstructionWorkEditorConfirmMessageScreen">
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
                label={
                  <Phrase testID="ConstructionWorkEditorCreateMessageSendPushNotificationCheckboxPhrase">
                    Wil je ook een pushbericht versturen?
                  </Phrase>
                }
                onValueChange={togglePushNotificationChecked}
                testID="ConstructionWorkEditorCreateMessageSendPushNotificationCheckbox"
                value={isPushNotificationChecked}
              />
              {!!isPushNotificationChecked && (
                <Column gutter="xs">
                  <Title
                    level="h5"
                    text={project.title}
                  />
                  <Phrase testID="ConstructionWorkEditorCreateMessageSendPushNotificationPreviewMessage">
                    {message.title}
                  </Phrase>
                </Column>
              )}
            </Column>
          )}
        </Column>
      </Box>
    </LoginBoundaryScreen>
  )
}
