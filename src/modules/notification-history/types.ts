import {ModuleSlug} from '@/modules/slugs'
import {type PushNotificationData} from '@/types/notification'

export type GetNotificationsResult = Notification[]

export type Notification = {
  body: string
  context: Record<string, string | number | object> & PushNotificationData
  created_at: string
  id: string
  is_read: boolean
  module_slug: ModuleSlug
  pushed_at: string
  title: string
}
