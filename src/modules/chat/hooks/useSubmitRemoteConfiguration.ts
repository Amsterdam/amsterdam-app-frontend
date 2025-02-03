import {useEffect} from 'react'
import {submitRemoteConfiguration} from 'react-native-salesforce-messaging-in-app/src'
import {RemoteConfiguration} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {useTrackException} from '@/processes/logging/hooks/useTrackException'
import {ExceptionLogKey} from '@/processes/logging/types'

export const useSubmitRemoteConfiguration = (
  remoteConfiguration: RemoteConfiguration | undefined,
) => {
  const trackException = useTrackException()

  useEffect(() => {
    if (remoteConfiguration) {
      const remoteConfig = JSON.parse(
        JSON.stringify(remoteConfiguration),
      ) as RemoteConfiguration

      remoteConfig.preChatConfiguration[0]?.hiddenPreChatFields.forEach(
        field => {
          if (field.name === 'Origin' || field.name === 'Chat_Origin') {
            field.value = 'App'
          } else if (field.name === 'Start_Location') {
            field.value = 'contact'
          }
        },
      )
      submitRemoteConfiguration(remoteConfig, true).catch(error =>
        trackException(
          ExceptionLogKey.chatSubmitRemoteConfiguration,
          'useSubmitRemoteConfiguration.ts',
          {
            error,
          },
        ),
      )
    }
  }, [remoteConfiguration, trackException])
}
