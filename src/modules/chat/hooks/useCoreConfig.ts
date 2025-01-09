import {
  CHAT_DEVELOPER_NAME_DEV,
  CHAT_ORGANIZATION_ID_DEV,
  CHAT_URL_DEV,
  CHAT_DEVELOPER_NAME_TEST,
  CHAT_ORGANIZATION_ID_TEST,
  CHAT_URL_TEST,
  CHAT_DEVELOPER_NAME_ACC,
  CHAT_ORGANIZATION_ID_ACC,
  CHAT_URL_ACC,
  CHAT_DEVELOPER_NAME_PROD,
  CHAT_ORGANIZATION_ID_PROD,
  CHAT_URL_PROD,
} from '@env'
import {CoreConfig} from 'react-native-salesforce-messaging-in-app/src/NativeSalesforceMessagingInApp'
import {Environment} from '@/environment'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectEnvironment} from '@/store/slices/environment'

export const useCoreConfig = () => {
  const {environment} = useSelector(selectEnvironment)
  const config = {} as CoreConfig

  switch (environment) {
    case Environment.development:
    case Environment.custom:
      config.developerName = CHAT_DEVELOPER_NAME_DEV ?? ''
      config.organizationId = CHAT_ORGANIZATION_ID_DEV ?? ''
      config.url = CHAT_URL_DEV ?? ''
      break
    case Environment.test:
      config.developerName = CHAT_DEVELOPER_NAME_TEST ?? ''
      config.organizationId = CHAT_ORGANIZATION_ID_TEST ?? ''
      config.url = CHAT_URL_TEST ?? ''
      break
    case Environment.acceptance:
      config.developerName = CHAT_DEVELOPER_NAME_ACC ?? ''
      config.organizationId = CHAT_ORGANIZATION_ID_ACC ?? ''
      config.url = CHAT_URL_ACC ?? ''
      break
    case Environment.production:
      config.developerName = CHAT_DEVELOPER_NAME_PROD ?? ''
      config.organizationId = CHAT_ORGANIZATION_ID_PROD ?? ''
      config.url = CHAT_URL_PROD ?? ''
      break
  }

  return config
}
