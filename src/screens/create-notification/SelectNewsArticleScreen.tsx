import {StackNavigationProp} from '@react-navigation/stack'
import React, {useContext, useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {ValidationWarning} from '../../components/features/form'
import {
  Box,
  Button,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../components/ui'
import {Radio, RadioGroup} from '../../components/ui/forms'
import {Column, Row, ScrollView} from '../../components/ui/layout'
import {NotificationContext, NotificationStackParams} from './'

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'SelectNewsArticle'>
}

type FormData = {
  news: string
}

export const SelectNewsArticleScreen = ({navigation}: Props) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()
  const {articles, changeCurrentStep, changeNewsDetails} =
    useContext(NotificationContext)
  const newsArticles = articles?.filter(article => article.type === 'news')

  const watchRadioGroup = watch('news')

  const onSubmit = (data: FormData) => {
    const newsSelected = articles?.find(item => item.identifier === data.news)
    newsSelected &&
      changeNewsDetails({
        id: newsSelected?.identifier,
        title: newsSelected?.title,
      })
    navigation.navigate('VerifyNotification')
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      changeCurrentStep(2)
    })
    return focusListener
  }, [changeCurrentStep, navigation])

  return newsArticles ? (
    <ScrollView grow>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="xl">
            <>
              <Title margin text="Kies een optie" />
              <Controller
                control={control}
                render={({field: {onChange}}) => (
                  <RadioGroup
                    accessibilityLabel="Selecteer een bestaand nieuwsartikel"
                    name="news"
                    onChange={val => onChange(val)}>
                    {newsArticles
                      .filter(article => article.type === 'news')
                      .map(newsArticle => (
                        <Radio
                          isChecked={newsArticle.identifier === watchRadioGroup}
                          key={newsArticle.identifier}
                          value={newsArticle.identifier}>
                          <Text large>{newsArticle.title}</Text>
                        </Radio>
                      ))}
                  </RadioGroup>
                )}
                name="news"
                rules={{required: 'Kies een nieuwsartikel'}}
              />
              {errors.news && (
                <ValidationWarning warning="Selecteer een nieuwsartikel" />
              )}
            </>
            <Column gutter="md">
              <View>
                <Title level={4} margin text="Schrijf zelf een nieuwsartikel" />
                <Text>
                  Leg uit wat je de Amsterdammer via het pushbericht wilt laten
                  weten.
                </Text>
              </View>
              <View style={styles.justifyStart}>
                <Button
                  onPress={() => navigation.navigate('ProjectWarningForm')}
                  text="Schrijf een nieuwsartikel"
                  variant="inverse"
                />
              </View>
            </Column>
          </Column>
        </Box>
        <Box>
          <Row align="between" valign="center">
            <TextButton
              direction="backward"
              emphasis
              onPress={navigation.goBack}
              text="Vorige"
            />
            <SubmitButton onPress={handleSubmit(onSubmit)} text="Controleer" />
          </Row>
        </Box>
      </Column>
    </ScrollView>
  ) : null
}

const styles = StyleSheet.create({
  justifyStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
})
