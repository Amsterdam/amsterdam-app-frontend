import {CoreConfig} from 'react-native-salesforce-messaging-in-app/src/types'
import {Environment} from '@/environment'
import {useSelector} from '@/hooks/redux/useSelector'
import {selectEnvironment} from '@/store/slices/environment'

export const useCoreConfig = () => {
  const {environment} = useSelector(selectEnvironment)
  const config = {} as CoreConfig

  switch (environment) {
    case Environment.development:
    case Environment.custom:
    case Environment.test:
      config.developerName = process.env.CHAT_DEVELOPER_NAME_DEV ?? ''
      config.organizationId = process.env.CHAT_ORGANIZATION_ID_DEV ?? ''
      config.url = process.env.CHAT_URL_DEV ?? ''
      break
    // case Environment.test:
    //   config.developerName = process.env.CHAT_DEVELOPER_NAME_TEST ?? ''
    //   config.organizationId = process.env.CHAT_ORGANIZATION_ID_TEST ?? ''
    //   config.url = process.env.CHAT_URL_TEST ?? ''
    //   break
    case Environment.acceptance:
      config.developerName = process.env.CHAT_DEVELOPER_NAME_ACC ?? ''
      config.organizationId = process.env.CHAT_ORGANIZATION_ID_ACC ?? ''
      config.url = process.env.CHAT_URL_ACC ?? ''
      break
    case Environment.production:
      config.developerName = process.env.CHAT_DEVELOPER_NAME_PROD ?? ''
      config.organizationId = process.env.CHAT_ORGANIZATION_ID_PROD ?? ''
      config.url = process.env.CHAT_URL_PROD ?? ''
      break
  }

  return config
}
