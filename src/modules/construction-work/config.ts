import {isDevApp} from '@/processes/development'

/**
 * The amount of days within which we consider an article to be recent.
 */
export const recentArticleMaxAge = isDevApp ? 60 : 3
