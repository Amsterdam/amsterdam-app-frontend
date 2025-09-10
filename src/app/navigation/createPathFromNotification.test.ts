import {createPathFromNotification} from '@/app/navigation/createPathFromNotification'
import {ModuleSlug} from '@/modules/slugs'
import {PushNotification} from '@/types/notification'

describe('createRoute', () => {
  const mockConstructionWorkNotification = {
    data: {
      type: 'NewsUpdatedByProjectManager',
      linkSourceid: '123',
      module_slug: ModuleSlug['construction-work'],
    },
    title: 'Title',
    body: 'Body',
  } as const

  const mockParkingNotification = {
    data: {
      module_slug: ModuleSlug.parking,
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
        title: mockConstructionWorkNotification.title,
        body: mockConstructionWorkNotification.body,
      }),
    ).toBeUndefined()
  })

  it('should return route with all params', () => {
    expect(createPathFromNotification(mockParkingNotification)).toBe(
      '/module/parking',
    )
  })

  it('should url encode title and body', () => {
    expect(
      createPathFromNotification({
        data: mockConstructionWorkNotification.data,
        title: 'Test title',
        body: 'Test/body',
      }),
    ).toBe('/news/123/Test%20title/Test%20title%20-%20Test%2Fbody/true')
  })
})
