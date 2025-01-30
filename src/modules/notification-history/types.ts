import {ModuleSlug} from '@/modules/slugs'
import {type PushNotificationData} from '@/types/notification'

export type GetNotificationsResult = Notification[]

export type Notification = {
  body: string
  context: Record<string, string | number | object> & PushNotificationData
  created_at: string
  id: string
  image?: NotificationImage
  is_read: boolean
  module_slug: ModuleSlug
  pushed_at: string
  title: string
}

type NotificationImage = {
  description: string
  id: number
  variants: {height: number; image: string; width: number}[]
}
