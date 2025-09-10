import {EventType} from '@notifee/react-native'
import type {ReduxDispatch} from '@/hooks/redux/types'
import {
  onNotificationEvent,
  type PushNotificationType,
} from '@/modules/construction-work/onNotificationEvent'
import {ModuleSlug} from '@/modules/slugs'
import {PushNotification} from '@/types/notification'

const mockDispatch = (() => null) as ReduxDispatch

describe('createRoute', () => {
  const mockNotification = {
    data: {
      type: 'NewsUpdatedByProjectManager',
      linkSourceid: '123',
      module_slug: ModuleSlug['construction-work'],
    },
    title: 'Title',
    body: 'Body',
  } as const

  it('should return undefined if data or notification is not provided', () => {
    expect(
      onNotificationEvent(EventType.ACTION_PRESS, {}, false, mockDispatch),
    ).toBeUndefined()
  })

  it('should return undefined if data linkSourceid is missing', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {
          notification: {
            data: {} as PushNotification<{
              type: PushNotificationType
            }>['data'],
            title: mockNotification.title,
            body: mockNotification.body,
          },
        },
        false,
        mockDispatch,
      ),
    ).toBeUndefined()
  })

  it('should return route with only linkSourceid param, if notification title is missing', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {
          notification: {
            data: mockNotification.data,
            body: mockNotification.body,
          },
        },
        true,
        mockDispatch,
      ),
    ).toBe('/news/123//%20-%20Body/true')
  })

  it('should return route with linkSourceid param and title param, if body is missing', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {
          notification: {
            data: mockNotification.data,
            title: mockNotification.title,
          },
        },
        false,
        mockDispatch,
      ),
    ).toBe('/news/123/Title/Title%20-%20/false')
  })

  it('should return route with all params', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {notification: mockNotification},
        true,
        mockDispatch,
      ),
    ).toBe('/news/123/Title/Title%20-%20Body/true')
  })

  it('should return route with only linkSourceid param, if notification title is an empty string', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {
          notification: {
            data: mockNotification.data,
            body: mockNotification.body,
            title: '',
          },
        },
        false,
        mockDispatch,
      ),
    ).toBe('/news/123//%20-%20Body/false')
  })

  it('should return route with linkSourceid param and title param, if body is an empty string', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {
          notification: {
            data: mockNotification.data,
            title: mockNotification.title,
            body: '',
          },
        },
        false,
        mockDispatch,
      ),
    ).toBe('/news/123/Title/Title%20-%20/false')
  })

  it('should url encode title and body', () => {
    expect(
      onNotificationEvent(
        EventType.ACTION_PRESS,
        {
          notification: {
            data: mockNotification.data,
            title: 'Test title',
            body: 'Test/body',
          },
        },
        true,
        mockDispatch,
      ),
    ).toBe('/news/123/Test%20title/Test%20title%20-%20Test%2Fbody/true')
  })
})
