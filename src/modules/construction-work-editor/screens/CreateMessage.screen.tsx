import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useLayoutEffect, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Box} from '@/components/ui/containers'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {MessageForm} from '@/modules/construction-work-editor/components'
import {
  selectMainImage,
  setCurrentProjectId,
  setProject,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {
  ConstructionWorkEditorModalName,
  ConstructionWorkEditorRouteName,
} from '@/modules/construction-work-editor/routes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.createMessage
  >
  route: RouteProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.createMessage
  >
}

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
    <Screen keyboardAware scroll>
      <Column align="between" gutter="xl">
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
      <Row align="end">
        <NavigationButton
          iconSize={16}
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
        />
      </Row>
    </Screen>
  )
}
