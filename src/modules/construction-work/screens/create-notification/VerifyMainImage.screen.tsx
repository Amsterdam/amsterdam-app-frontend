import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {ImagePreviewTouchable} from '@/components/features/create-notification'
import {Box, Title} from '@/components/ui'
import {SubmitButton, TextButton} from '@/components/ui/buttons'
import {
  CharactersLeftDisplay,
  TextInput,
  ValidationWarning,
} from '@/components/ui/forms'
import {Column, Row, ScrollView} from '@/components/ui/layout'
import {
  selectMainImage,
  setMainImage,
  setMainImageDescription,
} from '@/modules/construction-work/screens/create-notification/notificationDraftSlice'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from '@/modules/construction-work/screens/create-notification/routes'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

const maxCharacters = {
  title: 54,
}

type FormData = {
  title: string
}

export const VerifyMainImageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const image = useSelector(selectMainImage)
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm<FormData>()
  const characterCountTitle = watch('title')?.length ?? 0

  if (!image) {
    return null
  }

  const clickIt = () => {
    dispatch(setMainImage(undefined))
    navigation.goBack()
  }

  const onSubmit: SubmitHandler<FormData> = ({title}) => {
    dispatch(setMainImageDescription(title))
    navigation.navigate(CreateNotificationRouteName.verifyNotification)
  }

  const onBackward = () => {
    navigation.goBack()
  }

  return (
    <ScrollView grow>
      <Box grow>
        <Column align="between">
          <Column gutter="md">
            <Title text="Gekozen afbeelding" />
            <ImagePreviewTouchable image={image} onPress={clickIt} />
            <View>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Beschrijf kort wat er op de foto staat"
                      label="Beschrijf kort wat er op de foto staat"
                      maxLength={maxCharacters.title}
                      onChangeText={onChange}
                      value={value}
                      warning={!!errors.title}
                    />
                  )}
                  name="title"
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.title - (characterCountTitle || 0)
                  }
                />
              </Column>
              {errors.title && <ValidationWarning warning="Vul een titel in" />}
            </View>
          </Column>
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              onPress={handleSubmit(onBackward)}
              text="Vorige"
            />
            <SubmitButton onPress={handleSubmit(onSubmit)} text="Controleer" />
          </Row>
        </Column>
      </Box>
    </ScrollView>
  )
}
