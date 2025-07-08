import {useCallback} from 'react'
import {useOpenWebUrl} from '@/hooks/linking/useOpenWebUrl'
import {useDispatch} from '@/hooks/redux/useDispatch'
import {useUrlForEnv} from '@/hooks/useUrlForEnv'
import {alerts} from '@/modules/city-pass/alerts'
import {cityPassExternalLinks} from '@/modules/city-pass/external-links'
import {useGetAccessTokenMutation} from '@/modules/city-pass/service'
import {setTokenExpiration} from '@/modules/city-pass/slice'
import {useAlert} from '@/store/slices/alert'
import {setSecureItem, SecureItemKey} from '@/utils/secureStorage'

export const useLogin = () => {
  const dispatch = useDispatch()
  const openWebUrl = useOpenWebUrl()
  const loginUrl = useUrlForEnv(cityPassExternalLinks)
  const {setAlert} = useAlert()
  const [getAccessToken] = useGetAccessTokenMutation()

  return useCallback(async () => {
    try {
      await getAccessToken()
        .unwrap()
        .then(
          ({
            access_token,
            refresh_token,
            access_token_expiration,
            refresh_token_expiration,
          }) => {
            void setSecureItem(SecureItemKey.cityPassAccessToken, access_token)
            void setSecureItem(
              SecureItemKey.cityPassRefreshToken,
              refresh_token,
            )
            dispatch(
              setTokenExpiration({
                accessTokenExpiration: access_token_expiration,
                refreshTokenExpiration: refresh_token_expiration,
              }),
            )
            openWebUrl(`${loginUrl}${access_token}`) // Re-enters the app with a deeplink when finished
          },
        )
    } catch {
      setAlert(alerts.retrievePassesFailed)
    }
  }, [dispatch, getAccessToken, loginUrl, openWebUrl, setAlert])
}
