import {RouteProp} from '@react-navigation/core'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Box} from '@/components/ui'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Paragraph, Title} from '@/components/ui/text'
import {MessageForm} from '@/modules/construction-work-editor/components'
import {
  ConstructionWorkEditorRouteName,
  ConstructionWorkEditorStackParams,
} from '@/modules/construction-work-editor/routes'
import {setProject} from '@/modules/construction-work/screens/create-notification'

type Props = {
  navigation: StackNavigationProp<
    ConstructionWorkEditorStackParams,
    ConstructionWorkEditorRouteName.createMessage
  >
  route: RouteProp<
    ConstructionWorkEditorStackParams,
    ConstructionWorkEditorRouteName.createMessage
  >
}

export const CreateMessageScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch()
  const [isNextButtonPressed, setNextButtonPressed] = useState(false)

  useEffect(() => {
    const {projectId, projectTitle} = route.params
    dispatch(
      setProject({
        id: projectId,
        title: projectTitle,
      }),
    )
  }, [dispatch, route])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params.projectTitle,
    })
  }, [navigation, route.params.projectTitle])

  return (
    <Screen scroll>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="md">
            <Title text="Maak een bericht" />
            <Paragraph variant="intro">
              Schrijftips voor een nieuwsbericht.
            </Paragraph>
            <Row align="start">
              <Button
                label="Toon schrijftips"
                onPress={() => {
                  console.log('hewhi')
                }}
              />
            </Row>
          </Column>
        </Box>
      </Column>
      <Box>
        <MessageForm
          onFormSubmitted={() =>
            navigation.navigate(ConstructionWorkEditorRouteName.confirmMessage)
          }
          onMainImageSelected={() =>
            navigation.navigate(
              ConstructionWorkEditorRouteName.addMainImageToMessage,
            )
          }
          isSubmitButtonPressed={isNextButtonPressed}
        />
      </Box>
      <Row align="end" valign="center">
        <NavigationButton
          iconSize={16}
          label="Volgende"
          onPress={() => setNextButtonPressed(true)}
        />
      </Row>
    </Screen>
  )
}
