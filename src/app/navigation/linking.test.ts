import {createPathFromNotification} from './linking'
import {Notification, PushNotification} from '@/types/notification'

describe('createRoute', () => {
  const mockNotification: PushNotification = {
    data: {
      type: 'NewsUpdatedByProjectManager',
      linkSourceid: '123',
    },
    notification: {
      identifier: '123',
      publication_date: '2024-02-12',
      project_identifier: '456',
      title: 'Test Notification',
      body: 'Test Body',
    },
  }

  it('should return undefined if data or notification is not provided', () => {
    expect(createPathFromNotification({} as PushNotification)).toBeUndefined()
  })

  it('should return undefined if data linkSourceid is missing', () => {
    expect(
      createPathFromNotification({
        data: {},
        notification: mockNotification.notification,
      }),
    ).toBeUndefined()
  })

  it('should return route with only linkSourceid param, if notification title is missing', () => {
    const notificationWithoutTitle = {...mockNotification.notification}

    delete notificationWithoutTitle.title
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        notification: notificationWithoutTitle as Notification,
      }),
    ).toBe('amsterdam://news/123')
  })

  it('should return route with linkSourceid param and title param, if body is missing', () => {
    const notificationWithoutBody = {...mockNotification.notification}

    delete notificationWithoutBody.body
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        notification: notificationWithoutBody as Notification,
      }),
    ).toBe('amsterdam://news/123/Test Notification')
  })

  it('should return route with all params', () => {
    expect(createPathFromNotification(mockNotification)).toBe(
      `amsterdam://news/123/Test Notification/Test Notification - Test Body`,
    )
  })

  it('should return route with only linkSourceid param, if notification title is an empty string', () => {
    const notificationWithEmptyTitle = {
      ...mockNotification.notification,
      title: '',
    }

    expect(
      createPathFromNotification({
        data: mockNotification.data,
        notification: notificationWithEmptyTitle as Notification,
      }),
    ).toBe('amsterdam://news/123')
  })

  it('should return route with linkSourceid param and title param, if body is an empty string', () => {
    const notificationWithEmptyBody = {
      ...mockNotification.notification,
      body: '',
    }

    expect(
      createPathFromNotification({
        data: mockNotification.data,
        notification: notificationWithEmptyBody as Notification,
      }),
    ).toBe(`amsterdam://news/123/Test Notification`)
  })
})
