import {createPathFromNotification} from './linking'
import {PushNotification} from '@/types/notification'

describe('createRoute', () => {
  const mockNotification = {
    data: {
      type: 'NewsUpdatedByProjectManager',
      linkSourceid: '123',
    },
    title: 'Title',
    body: 'Body',
  } as const

  it('should return undefined if data or notification is not provided', () => {
    expect(createPathFromNotification({} as PushNotification)).toBeUndefined()
  })

  it('should return undefined if data linkSourceid is missing', () => {
    expect(
      createPathFromNotification({
        data: {},
        title: mockNotification.title,
        body: mockNotification.body,
      }),
    ).toBeUndefined()
  })

  it('should return route with only linkSourceid param, if notification title is missing', () => {
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        body: mockNotification.body,
      }),
    ).toBe('amsterdam://news/123//%20-%20Body')
  })

  it('should return route with linkSourceid param and title param, if body is missing', () => {
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        title: mockNotification.title,
      }),
    ).toBe('amsterdam://news/123/Title/Title%20-%20')
  })

  it('should return route with all params', () => {
    expect(createPathFromNotification(mockNotification)).toBe(
      `amsterdam://news/123/Title/Title%20-%20Body`,
    )
  })

  it('should return route with only linkSourceid param, if notification title is an empty string', () => {
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        body: mockNotification.body,
        title: '',
      }),
    ).toBe('amsterdam://news/123//%20-%20Body')
  })

  it('should return route with linkSourceid param and title param, if body is an empty string', () => {
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        title: mockNotification.title,
        body: '',
      }),
    ).toBe(`amsterdam://news/123/Title/Title%20-%20`)
  })

  it('should url encode title and body', () => {
    expect(
      createPathFromNotification({
        data: mockNotification.data,
        title: 'Test title',
        body: 'Test/body',
      }),
    ).toBe(`amsterdam://news/123/Test%20title/Test%20title%20-%20Test%2Fbody`)
  })
})
