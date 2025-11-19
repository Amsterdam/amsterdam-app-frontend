import type {FetchBaseQueryError} from '@reduxjs/toolkit/query'
import {alerts} from '@/modules/parking/alerts'
import {getLoginFailedAlert} from '@/modules/parking/utils/getLoginFailedAlert'

describe('getLoginFailedAlert', () => {
  it('should return the correct alert for SSP_BAD_CREDENTIALS', () => {
    const error = {
      data: {
        code: 'SSP_BAD_CREDENTIALS',
      },
    } as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginForbiddenFailed)
  })

  it('should return the correct alert for SSP_ACCOUNT_INACTIVE', () => {
    const error = {
      data: {
        code: 'SSP_ACCOUNT_INACTIVE',
      },
    } as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginAccountInactiveFailed)
  })

  it('should return the correct alert for SSP_ACCOUNT_BLOCKED', () => {
    const error = {
      data: {
        code: 'SSP_ACCOUNT_BLOCKED',
      },
    } as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginAccountBlockedFailed)
  })

  it('should return the default alert for unknown error codes', () => {
    const error = {
      data: {
        code: 'UNKNOWN_ERROR_CODE',
      },
    } as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginFailed)
  })

  it('should return the default alert when there is no error code', () => {
    const error = {data: 'something'} as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginFailed)
  })
  it('should return the default alert when there is no error body', () => {
    const error = {} as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginFailed)
  })
  it('should return the default alert when error', () => {
    const error = {} as unknown as FetchBaseQueryError

    const alert = getLoginFailedAlert(error)

    expect(alert).toEqual(alerts.loginFailed)
  })
})
