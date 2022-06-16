import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {StyleSheet, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  Box,
  Button,
  SubmitButton,
  Text,
  TextButton,
  Title,
} from '../../../../components/ui'
import {
  RadioGroup,
  Radio,
  ValidationWarning,
} from '../../../../components/ui/forms'
import {Column, Row, ScrollView} from '../../../../components/ui/layout'
import {useGetArticlesQuery} from '../../../../services'
import {
  selectProjectId,
  setNewsArticle,
  setStep,
} from './notificationDraftSlice'
import {
  CreateNotificationRouteName,
  CreateNotificationStackParams,
} from './routes'

type Props = {
  navigation: StackNavigationProp<
    CreateNotificationStackParams,
    CreateNotificationRouteName
  >
}

type FormData = {
  news: string
}

export const SelectNewsArticleScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const projectId = useSelector(selectProjectId)
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()

  const watchRadioGroup = watch('news')

  const {newsArticles} = useGetArticlesQuery(
    {
      projectIds: [projectId!],
    },
    {
      selectFromResult: ({data}) => ({
        newsArticles: data?.filter(article => article.type === 'news'),
      }),
      skip: !projectId,
    },
  )

  const onSubmit = (data: FormData) => {
    const newsSelected = newsArticles?.find(
      item => item.identifier === data.news,
    )
    newsSelected &&
      dispatch(
        setNewsArticle({
          id: newsSelected?.identifier,
          title: newsSelected?.title,
        }),
      )
    navigation.navigate(CreateNotificationRouteName.verifyNotification)
  }

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(2))
    })
    return focusListener
  }, [dispatch, navigation])

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
                  onPress={() =>
                    navigation.navigate(
                      CreateNotificationRouteName.projectWarningForm,
                    )
                  }
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
