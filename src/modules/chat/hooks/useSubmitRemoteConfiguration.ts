import {useEffect} from 'react'
import {submitRemoteConfiguration} from 'react-native-salesforce-messaging-in-app/src'
import {RemoteConfiguration} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'

export const useSubmitRemoteConfiguration = (
  remoteConfiguration: RemoteConfiguration | undefined,
) => {
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
      void submitRemoteConfiguration(remoteConfig, true)
    }
  }, [remoteConfiguration])
}
