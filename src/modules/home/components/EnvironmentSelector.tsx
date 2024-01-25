import {useEffect} from 'react'
import RNRestart from 'react-native-restart'
import {Button} from '@/components/ui/buttons/Button'
import {Box} from '@/components/ui/containers/Box'
import {TextInput} from '@/components/ui/forms/TextInput'
import {Column} from '@/components/ui/layout/Column'
import {
  Environment,
  EnvironmentAzure,
  environmentAzureLabels,
} from '@/environment'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useSelector} from '@/hooks/redux/useSelector'
import {ModuleSlug} from '@/modules/slugs'
import {isDevApp} from '@/processes/development'
import {baseApi} from '@/services/init'
import {
  selectEnvironmentConfig,
  setCustomEnvironment,
  setEnvironment,
} from '@/store/slices/environment'

const SLUGS = {
  CONSTRUCTION_WORK_SLUG: ModuleSlug['construction-work'],
  CONTACT_SLUG: ModuleSlug.contact,
  MODULE_SLUG: 'modules',
}

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

  useEffect(() => () => RNRestart.Restart(), [])

  return isDevApp ? (
    <Box>
      <Column gutter="xl">
        <>
          <Column gutter="md">
            {Object.values(Environment).map(env => (
              <Button
                key={env}
                label={env}
                onPress={() => {
                  dispatch(setEnvironment(env as Environment))
                  dispatch(baseApi.util.resetApiState())
                }}
                variant={environment === env ? 'secondary' : 'primary'}
              />
            ))}
          </Column>
          {environment === Environment.custom && (
            <Column gutter="md">
              {Object.entries(SLUGS).map(([key, value]) => (
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
                  value={custom[value as keyof typeof custom]}
                />
              ))}
            </Column>
          )}
        </>
        <Column gutter="md">
          {Object.values(EnvironmentAzure).map(env => (
            <Button
              key={env}
              label={environmentAzureLabels[env]}
              onPress={() => {
                dispatch(setEnvironment(env))
                dispatch(baseApi.util.resetApiState())
              }}
              variant={environment === env ? 'secondary' : 'primary'}
            />
          ))}
        </Column>
      </Column>
    </Box>
  ) : null
}
