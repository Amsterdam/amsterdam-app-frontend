import {useEffect, useLayoutEffect, useRef} from 'react'
import {NavigationProps} from '@/app/navigation/types'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {Alert} from '@/components/ui/feedback/Alert'
import {Column} from '@/components/ui/layout/Column'
import {Row} from '@/components/ui/layout/Row'
import {Screen} from '@/components/ui/layout/Screen'
import {Link} from '@/components/ui/text/Link'
import {Title} from '@/components/ui/text/Title'
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
  const mainImage = useSelector(selectMainImage(route.params.projectId))

  const formRef = useRef<{
    handleSubmit: (onSuccess?: () => void) => Promise<void>
  }>()

  useEffect(() => {
    const {projectId, projectTitle} = route.params

    dispatch(
      setProject({
        id: projectId,
        title: projectTitle,
      }),
    )
    dispatch(setCurrentProjectId(projectId))
  }, [dispatch, route])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.projectTitle,
    })
  }, [navigation, route.params.projectTitle])

  return (
    <Screen
      keyboardAware
      scroll
      stickyHeader={<Alert />}>
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
                      projectTitle: route.params.projectTitle,
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
