import {ModuleSlug} from '@/modules/slugs'

export type GetNotificationsResult = Notification[]

export type Notification = {
  body: string
  context: string
  created_at: string
  id: string
  is_read: boolean
  module_slug: ModuleSlug
  pushed_at: string
  title: string
}
