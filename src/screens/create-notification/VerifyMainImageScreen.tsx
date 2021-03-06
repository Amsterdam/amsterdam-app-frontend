import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {ImagePreviewTouchable} from '../../components/features/create-notification'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../../components/features/form'
import {Box, SubmitButton, TextButton, Title} from '../../components/ui'
import {TextInput} from '../../components/ui/forms'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {
  selectMainImage,
  setMainImage,
  setMainImageDescription,
} from './notificationDraftSlice'
import {NotificationStackParams} from '.'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'VerifyMainImage'>
}

const maxCharacters = {
  title: 54,
}

export const VerifyMainImageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const image = useSelector(selectMainImage)
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()
  const [characterCountTitle, setCharacterCountTitle] = useState<number>(0)

  const watchTitle = watch('title')

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  if (!image) {
    return null
  }

  const clickIt = () => {
    dispatch(setMainImage(undefined))
    navigation.goBack()
  }

  const onSubmit = (data: {title: string}) => {
    dispatch(setMainImageDescription(data.title))
    navigation.navigate('VerifyNotification')
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
                      warning={errors.title}
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
