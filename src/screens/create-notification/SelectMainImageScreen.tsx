import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import ImagePicker from 'react-native-image-crop-picker'
import {useDispatch} from 'react-redux'
import HeroImage from '../../assets/images/project-warning-hero.svg'
import {AddButton, Box, Text, TextButton, Title} from '../../components/ui'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {size} from '../../tokens'
import {setMainImage, setStep} from './notificationDraftSlice'
import {NotificationStackParams} from '.'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'SelectMainImage'>
}

export const SelectMainImageScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(3))
    })
    return focusListener
  }, [dispatch, navigation])

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

  return (
    <ScrollView grow>
      <Box grow>
        <Column align="between">
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
              <TouchableOpacity style={styles.button}>
                <HeroImage />
              </TouchableOpacity>
            </Column>
          </Column>
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              onPress={navigation.goBack}
              text="Vorige"
            />
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
