import RNRestart from 'react-native-restart'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {RadioGroup} from '@/components/ui/forms/RadioGroup'
import {TextInput} from '@/components/ui/forms/TextInput'
import {Column} from '@/components/ui/layout/Column'
import {Title} from '@/components/ui/text/Title'
import {
  Environment,
  EnvironmentAzure,
  editableApiSlug,
  environmentAzureLabels,
} from '@/environment'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {isDevApp} from '@/processes/development'
import {baseApi} from '@/services/init'
import {
  selectEnvironmentConfig,
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
  const {environment, custom} = useSelector(selectEnvironmentConfig)
  const [selectedEnv, setSelectedEnv] = useState(environment)

  if (!isDevApp) {
    return
  }

  return (
    <Box borderStyle="solid">
      <Column gutter="md">
        <Title
          level="h3"
          text="Omgeving selecteren"
        />
        <RadioGroup<Environment>
          onChange={setSelectedEnv}
          options={Object.keys(Environment).map(env => ({
            label: env,
            value: env as Environment,
          }))}
          value={selectedEnv}
        />

        {selectedEnv === Environment.custom && (
          <Column gutter="md">
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
        <RadioGroup<Environment>
          onChange={setSelectedEnv}
          options={Object.keys(EnvironmentAzure).map(env => ({
            label: env,
            value: env as Environment,
          }))}
          value={selectedEnv}
        />
        <Button
          label="Switch and restart app"
          onPress={() => {
            dispatch(setEnvironment(selectedEnv))
            dispatch(baseApi.util.resetApiState())
            RNRestart.Restart()
          }}
        />
      </Column>
    </Box>
  )
}
