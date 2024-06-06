import {decode} from 'base-64'
global.atob = decode
import {jwtDecode} from 'jwt-decode'
import {DecodedJwtToken} from '@/modules/construction-work-editor/types'
import {devLog} from '@/processes/development'

export const decryptToken = (token: string) => jwtDecode<DecodedJwtToken>(token)

export const isTokenValid = (token: string | undefined) => {
  if (!token) {
    return false
  }

  const decryptedToken = decryptToken(token)

  if (Date.now() >= (decryptedToken.exp ?? 0) * 1000) {
    devLog('token expired')

    return false
  }

  return true
}
