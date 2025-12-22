import {HeaderComponent} from '@/modules/notification-history/components/HeaderComponent'
import {ModuleSlug} from '@/modules/slugs'
import {createClientModule} from '@/modules/utils/createModule'

export const notificationHistoryModule = createClientModule({
  hiddenInMenu: true,
  name: 'NotificationHistoryModule',
  HeaderComponent,
  slug: ModuleSlug['notification-history'],
  alwaysEnabled: true,
})
