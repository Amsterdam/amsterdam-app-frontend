import {decode} from 'base-64'
global.atob = decode
import {JwtPayload, jwtDecode} from 'jwt-decode'
import {devLog} from '@/processes/development'

type DecodedJwtToken = {
  groups?: string[]
} & JwtPayload

export const decryptToken = (token: string) => jwtDecode<DecodedJwtToken>(token)

export const isTokenValid = (token: string | undefined) => {
  if (!token) {
    return false
  }

  const decryptedToken = decryptToken(token)

  if (Date.now() >= (decryptedToken.exp ?? 0) * 1000) {
    devLog('construction-work-editor', 'access token expired')

    return false
  }

  return true
}
