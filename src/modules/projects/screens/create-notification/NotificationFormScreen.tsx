import {StackNavigationProp} from '@react-navigation/stack'
import React, {useEffect, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useDispatch, useSelector} from 'react-redux'
import {
  CharactersLeftDisplay,
  ValidationWarning,
} from '../../../../components/features/form'
import {Box, SubmitButton, Title} from '../../../../components/ui'
import {TextInput} from '../../../../components/ui/forms'
import {Column, Row, ScrollView} from '../../../../components/ui/layout'
import {useGetArticlesQuery} from '../../../../services'
import {NotificationQueryArg} from '../../../../types'
import {formatTime} from '../../../../utils'
import {NotificationStackParams} from './CreateNotificationScreen'
import {
  selectProjectId,
  setNotification,
  setStep,
} from './notificationDraftSlice'

const maxCharacters = {
  title: 54,
  message: 123,
}

type FormData = {
  title: string
  message: string
}

type Props = {
  navigation: StackNavigationProp<NotificationStackParams, 'NotificationForm'>
}

export const NotificationFormScreen = ({navigation}: Props) => {
  const dispatch = useDispatch()
  const projectId = useSelector(selectProjectId)
  const [characterCountTitle, setCharacterCountTitle] = useState<number>(
    maxCharacters.title,
  )
  const [characterCountMessage, setCharacterCountMessage] = useState<number>(
    maxCharacters.message,
  )
  const now = Date.now()

  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm()

  const watchTitle = watch('title')
  const watchMessage = watch('message')

  const {newsArticlesCount} = useGetArticlesQuery(
    {
      projectIds: [projectId!],
    },
    {
      selectFromResult: ({data}) => ({
        newsArticlesCount: data?.filter(article => article.type === 'news')
          .length,
      }),
      skip: !projectId,
    },
  )

  const onSubmit = (data: FormData) => {
    const notificationData: NotificationQueryArg = {
      title: data.title,
      body: data.message,
      project_identifier: projectId!,
    }

    const nextScreen =
      newsArticlesCount && newsArticlesCount > 0
        ? 'SelectNewsArticle'
        : 'ProjectWarningForm'

    dispatch(setNotification(notificationData))
    navigation.navigate(nextScreen)
  }

  useEffect(() => {
    setCharacterCountTitle(watchTitle?.length)
  }, [watchTitle])

  useEffect(() => {
    setCharacterCountMessage(watchMessage?.length)
  }, [watchMessage])

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(setStep(1))
    })
    return focusListener
  }, [dispatch, navigation])

  if (!projectId) {
    return null
  }

  return (
    <ScrollView grow>
      <Column align="between" gutter="xl">
        <Box>
          <Column gutter="lg">
            <Title text="Schrijf een pushbericht" />
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Maak een korte en bondige titel"
                      label="Maak een korte en bondige titel"
                      maxLength={maxCharacters.title}
                      multiline={true}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.title}
                    />
                  )}
                  name="title"
                  defaultValue={'TEST ' + formatTime(now, true) + ' '}
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.title - (characterCountTitle || 0)
                  }
                />
              </Column>
              {errors.title && <ValidationWarning warning="Vul een titel in" />}
            </>
            <>
              <Column gutter="xs">
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      accessibilityLabel="Tekst van het pushbericht"
                      label="Tekst van het pushbericht"
                      maxLength={maxCharacters.message}
                      multiline={true}
                      numberOfLines={3}
                      onChangeText={onChange}
                      value={value}
                      warning={errors.message}
                    />
                  )}
                  name="message"
                  defaultValue="Lorem ipsum dolor sit amet. We testen pushberichten vanuit de Amsterdam app."
                />
                <CharactersLeftDisplay
                  charactersLeft={
                    maxCharacters.message - (characterCountMessage || 0)
                  }
                />
              </Column>
              {errors.message && (
                <ValidationWarning warning="Type een pushbericht" />
              )}
            </>
          </Column>
        </Box>
        <Box>
          <Row align="end" valign="center">
            <SubmitButton
              onPress={handleSubmit(onSubmit)}
              text={
                newsArticlesCount
                  ? 'Kies een nieuwsartikel'
                  : 'Schrijf een nieuwsartikel'
              }
            />
          </Row>
        </Box>
      </Column>
    </ScrollView>
  )
}
