import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {RootStackParams} from '@/app/navigation'
import {FormField} from '@/components/features/FormField'
import {Box} from '@/components/ui'
import {NavigationButton} from '@/components/ui/buttons'
import {Column, Row, Screen} from '@/components/ui/layout'
import {Title} from '@/components/ui/text'
import {ImagePreview} from '@/modules/construction-work-editor/components'
import {
  selectMainImage,
  setMainImage,
  setMainImageDescription,
} from '@/modules/construction-work-editor/messageDraftSlice'
import {ConstructionWorkEditorRouteName} from '@/modules/construction-work-editor/routes'

type Props = {
  navigation: StackNavigationProp<
    RootStackParams,
    ConstructionWorkEditorRouteName
  >
}

const maxCharacters = {
  title: 54,
}

type FormData = {
  title: string
}

export const AddMainImageToMessageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const image = useSelector(selectMainImage)
  const form = useForm<FormData>()
  const {handleSubmit} = form

  if (!image) {
    return null
  }

  const resetAndGoBack = () => {
    dispatch(setMainImage(undefined))
    navigation.goBack()
  }

  const onSubmit: SubmitHandler<FormData> = ({title}) => {
    dispatch(setMainImageDescription(title))
    navigation.navigate(ConstructionWorkEditorRouteName.confirmMessage)
  }

  return (
    <Screen
      stickyFooter={
        <Row align="between" valign="center">
          <NavigationButton
            direction="backward"
            iconSize={16}
            label="Vorige"
            onPress={navigation.goBack}
          />
          <NavigationButton
            iconSize={16}
            label="Volgende"
            onPress={handleSubmit(onSubmit)}
          />
        </Row>
      }>
      <Box>
        <Column gutter="md">
          <Title text="Foto toevoegen" />
          <ImagePreview image={image} onPress={resetAndGoBack} />
          <FormProvider {...form}>
            <FormField
              label="Beschrijf kort wat er op de foto staat"
              maxCharacters={maxCharacters.title}
              name="title"
              numberOfLines={3}
              placeholder="Voer een tekst in…"
              rules={{
                required: 'Vul een tekst in',
              }}
            />
          </FormProvider>
        </Column>
      </Box>
    </Screen>
  )
}
