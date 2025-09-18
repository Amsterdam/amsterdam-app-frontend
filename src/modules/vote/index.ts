import {ModuleSlug} from '@/modules/slugs'
import {ModuleClientConfig} from '@/modules/types'

export const voteModule: ModuleClientConfig = {
  alwaysEnabled: true,
  name: 'VoteModule',
  slug: ModuleSlug.vote,
}
