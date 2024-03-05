import {useEffect, useRef} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {StatefulAlert} from '@/components/ui/feedback/AlertStateful'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Link} from '@/components/ui/text/Link'
import {Title} from '@/components/ui/text/Title'
import {useSetScreenTitle} from '@/hooks/navigation/useSetScreenTitle'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {MessageForm} from '@/modules/construction-work-editor/components/MessageForm'
import {
  selectMainImage,
  setCurrentProjectId,
  setProject,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {
  ConstructionWorkEditorModalName,
  ConstructionWorkEditorRouteName,
} from '@/modules/construction-work-editor/routes'

type Props = NavigationProps<ConstructionWorkEditorRouteName.createMessage>

export const CreateMessageScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()

  const {projectId, screenHeaderTitle: projectTitle} = route.params

  const mainImage = useSelector(selectMainImage(projectId.toString()))

  const formRef = useRef<{
    handleSubmit: (onSuccess?: () => void) => Promise<void>
  }>()

  useEffect(() => {
    dispatch(
      setProject({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        id: projectId,
        title: projectTitle,
      }),
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(setCurrentProjectId(projectId))
  }, [dispatch, projectId, projectTitle])

  useSetScreenTitle()

  return (
    <Screen
      keyboardAware
      scroll
      stickyHeader={<StatefulAlert />}
      testID="ConstructionWorkEditorCreateMessageScreen">
      <Column
        align="between"
        gutter="xl">
        <Box>
          <Column gutter="md">
            <Title text="Maak een bericht" />
            <Row align="start">
              <Button
                label="Bekijk schrijftips"
                onPress={() => {
                  navigation.navigate(
                    ConstructionWorkEditorModalName.writingGuide,
                    {
                      screenHeaderTitle: projectTitle,
                    },
                  )
                }}
                testID="ConstructionWorkEditorCreateMessageWritingGuideButton"
              />
            </Row>
          </Column>
        </Box>
      </Column>
      <Box>
        <MessageForm
          onMainImageSelected={() =>
            navigation.navigate(
              ConstructionWorkEditorRouteName.addMainImageToMessage,
            )
          }
          ref={formRef}
        />
      </Box>
      <Box>
        <Row align="end">
          <Link
            label="Volgende"
            onPress={() =>
              formRef.current?.handleSubmit(() => {
                mainImage
                  ? navigation.navigate(
                      ConstructionWorkEditorRouteName.addMainImageToMessage,
                    )
                  : navigation.navigate(
                      ConstructionWorkEditorRouteName.confirmMessage,
                    )
              })
            }
            testID="ConstructionWorkEditorCreateMessageNextButton"
            variant="forward"
          />
        </Row>
      </Box>
    </Screen>
  )
}
