import {ArticleMetaId} from '@/modules/construction-work/types/api'

/**
 * When an endpoint returns articles of different types (news or warning), the IDs are not unique.
 * To get a unique ID, e.g. to set the key prop in lists, we can combine the article type and the ID, which can be found in the meta_id property.
 */
export const getUniqueArticleId = ({id, type}: ArticleMetaId) => `${type}${id}`
