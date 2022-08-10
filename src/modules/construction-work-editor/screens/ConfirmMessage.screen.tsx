import {StackNavigationProp} from '@react-navigation/stack'
import React, {useLayoutEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import HeroImage from '@/assets/images/project-warning-hero.svg'
import {Box} from '@/components/ui'
import {Button, NavigationButton} from '@/components/ui/buttons'
import {Row, Column, Screen} from '@/components/ui/layout'
import {Image} from '@/components/ui/media'
import {Paragraph, Title} from '@/components/ui/text'
import {
  selectCurrentProjectId,
  selectMainImage,
  selectMainImageDescription,
  selectMessage,
  selectProject,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'
import {Theme, useThemable} from '@/themes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorRouteName.confirmMessage
  >
}

export const ConfirmMessageScreen = ({navigation}: Props) => {
  const currentProjectId = useSelector(selectCurrentProjectId)
  const message = useSelector(selectMessage(currentProjectId))
  const project = useSelector(selectProject(currentProjectId))
  const mainImage = useSelector(selectMainImage(currentProjectId))
  const mainImageDescription = useSelector(
    selectMainImageDescription(currentProjectId),
  )
  const styles = useThemable(createStyles)

  useLayoutEffect(() => {
    project &&
      navigation.setOptions({
        headerTitle: project.title,
      })
  }, [navigation, project])

  const image = (
    <Column gutter="sm">
      {mainImage ? (
        <Image source={{uri: mainImage?.path}} />
      ) : (
        <View style={styles.placeholder}>
          <HeroImage />
        </View>
      )}
      <Paragraph>{mainImageDescription}</Paragraph>
    </Column>
  )

  return (
    <Screen
      scroll
      stickyFooter={
        <>
          <Box>
            <Button label="Plaats bericht" />
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
