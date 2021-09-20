import React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {
  Box,
  Button,
  Gutter,
  ScreenWrapper,
  Text,
  TextInput,
  Title,
} from '../components/ui'
import {size} from '../tokens'

export const PushNotificationScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm()
  const onSubmit = data => console.log(data)

  return (
    <ScreenWrapper background="lighter">
      <Box>
        <Title text="Schrijf een pushnotificatie" />
        <Title
          level={2}
          margin
          text="Wat is de titel van de pushnotificatie?"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 54,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Zet hier duidelijk het onderwerp van de push notificatie in."
              multiline={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
          defaultValue=""
        />
        {errors.firstName && <Text>This is required.</Text>}
        <Gutter height={size.spacing.md} />

        <Controller
          control={control}
          rules={{
            maxLength: 123,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              label="Vertel hier in een paar zinnen wat de situatie is."
              multiline={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
          defaultValue=""
        />
        <Gutter height={size.spacing.md} />
        <Button text="Submit" onPress={handleSubmit(onSubmit)} />
      </Box>
    </ScreenWrapper>
  )
}
