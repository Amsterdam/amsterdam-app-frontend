import {HeaderComponent} from '@/modules/notification-history/components/HeaderComponent'
import {ModuleSlug} from '@/modules/slugs'
import {type ModuleClientConfig} from '@/modules/types'

export const notificationHistoryModule: ModuleClientConfig = {
  hiddenInMenu: true,
  name: 'NotificationHistoryModule',
  HeaderComponent,
  slug: ModuleSlug['notification-history'],
  alwaysEnabled: true,
}
