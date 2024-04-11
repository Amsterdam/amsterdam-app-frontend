import {pascalCase} from 'pascal-case'
import {useEffect} from 'react'
import RNRestart from 'react-native-restart'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {TextInput} from '@/components/ui/forms/TextInput'
import {Column} from '@/components/ui/layout/Column'
import {Environment, editableApiSlug} from '@/environment'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {isDevApp} from '@/processes/development'
import {baseApi} from '@/services/baseApi'
import {
  selectEnvironment,
  setCustomEnvironment,
  setEnvironment,
} from '@/store/slices/environment'

type CustomApiTextInputProps = {
  label: string
  onChangeText: (event: string) => void
  value: string
}

const CustomApiTextInput = ({
  label,
  onChangeText,
  value,
}: CustomApiTextInputProps) => (
  <TextInput
    accessibilityLabel={`${label} api url`}
    autoCapitalize="none"
    autoCorrect={false}
    keyboardType="url"
    label={label}
    onChangeText={onChangeText}
    selectTextOnFocus={false}
    value={value}
  />
)

export const EnvironmentSelector = () => {
  const dispatch = useDispatch()
  const {environment, custom} = useSelector(selectEnvironment)

  useEffect(() => () => RNRestart.Restart(), [])

  if (!isDevApp) {
    return null
  }

  return (
    <Box>
      <Column gutter="xl">
        <Column gutter="md">
          {Object.values(Environment).map(env => (
            <Button
              key={env}
              label={env}
              onPress={() => {
                dispatch(setEnvironment(env))
                dispatch(baseApi.util.resetApiState())
              }}
              testID={`HomeEnvironmentSelector${pascalCase(env)}Button`}
              variant={environment === env ? 'secondary' : 'primary'}
            />
          ))}
          {environment === Environment.custom && (
            <Column gutter="sm">
              {Object.entries(editableApiSlug).map(([key, value]) => (
                <CustomApiTextInput
                  key={key}
                  label={value}
                  onChangeText={(text: string) =>
                    dispatch(
                      setCustomEnvironment({
                        [value]: text,
                      }),
                    )
                  }
                  value={custom[value]}
                />
              ))}
            </Column>
          )}
        </Column>
      </Column>
    </Box>
  )
}
