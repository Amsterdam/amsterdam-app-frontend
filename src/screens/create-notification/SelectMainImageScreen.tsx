import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-crop-picker'
import {useDispatch, useSelector} from 'react-redux'
import HeroImage from '../../assets/images/project-warning-hero.svg'
import {ImagePreviewTouchable} from '../../components/features/create-notification'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../../components/features/form'
import {
  AddButton,
  Box,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {TextInput} from '../../components/ui/forms'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {size} from '../../tokens'
import {
  selectMainImage,
  setMainImage,
  setMainImageDescription,
  setStep,
} from './notificationDraftSlice'
import {NotificationStackParams} from '.'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'SelectMainImage'>
}

const maxCharacters = {
  title: 54,
}

export const SelectMainImageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const mainImage = useSelector(selectMainImage)
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()
  const [characterCountTitle, setCharacterCountTitle] = useState<number>(0)

  const watchTitle = watch('title')

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(3))
    })
    return focusListener
  }, [dispatch, navigation])

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  const pickImage = () => {
    ImagePicker.openPicker({
      cropperChooseText: 'Kiezen',
      cropperCancelText: 'Annuleren',
      cropperRotateButtonsHidden: true,
      cropping: true,
      mediaType: 'photo',
      width: size.warningMainPhoto.maxWidth,
      height: size.warningMainPhoto.maxHeight,
    }).then(image => {
      dispatch(setMainImage(image))
    })
  }

  const selectPlaceholder = () => {
    dispatch(setMainImage('placeholder'))
  }

  const clickIt = () => {
    dispatch(setMainImage(undefined))
  }

  const onSubmit = (data: {title: string}) => {
    dispatch(setMainImageDescription(data.title))
    navigation.navigate('VerifyNotification')
  }

  return (
    <ScrollView grow>
      <Box grow>
        <Column align="between">
          {mainImage ? (
            <Column gutter="md">
              <Title text="Gekozen afbeelding" />
              <ImagePreviewTouchable image={mainImage} onPress={clickIt} />
              <View>
                <Column gutter="xs">
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                      <TextInput
                        accessibilityLabel="Geef de foto een titel"
                        label="Geef de foto een titel"
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
                {errors.title && (
                  <ValidationWarning warning="Vul een titel in" />
                )}
              </View>
            </Column>
          ) : (
            <Column gutter="lg">
              <View>
                <Title margin text="Kies een afbeelding" />
                <Column gutter="sm">
                  <Title level={4} text="Upload een foto" />
                  <Text secondary>
                    Mensen onherkenbaar in beeld i.v.m. portretrecht.
                  </Text>
                  <AddButton onPress={pickImage} />
                </Column>
              </View>
              <Column gutter="sm">
                <Title level={4} text="Of kies de standaard afbeelding" />
                <TouchableOpacity
                  onPress={selectPlaceholder}
                  style={styles.button}>
                  <HeroImage />
                </TouchableOpacity>
              </Column>
            </Column>
          )}
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              onPress={navigation.goBack}
              text="Vorige"
            />
            {mainImage && (
              <SubmitButton
                onPress={handleSubmit(onSubmit)}
                text="Controleer"
              />
            )}
          </Row>
        </Column>
      </Box>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  button: {
    width: size.addButton.width,
    height: size.addButton.height,
  },
})
