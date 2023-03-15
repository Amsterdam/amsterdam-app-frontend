import {
  Projects,
  ProvideAddressButton,
} from '@/modules/construction-work/components/projects'
import {getBaseProjectTraits} from '@/modules/construction-work/components/projects/utils/getProjectTraits'
import {recentArticleMaxAge} from '@/modules/construction-work/config'

const queryParams = {
  articles_max_age: recentArticleMaxAge,
  fields: [
    'followed',
    'identifier',
    'images',
    'publication_date',
    'recent_articles',
    'subtitle',
    'title',
  ],
}

export const ProjectsByDate = () => (
  <Projects
    getProjectTraits={getBaseProjectTraits}
    HeaderButton={<ProvideAddressButton />}
    queryParams={queryParams}
  />
)
