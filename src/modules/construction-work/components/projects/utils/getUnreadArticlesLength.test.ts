import {getUnreadArticlesLength} from './getUnreadArticlesLength'
import {ReadArticle} from '@/modules/construction-work/slice'
import {ProjectRecentArticle} from '@/modules/construction-work/types/api'

const mockReadArticles: ReadArticle[] = [
  {id: 'article1', publicationDate: '2023-01-01'},
  {id: 'warning2', publicationDate: '2023-02-01'},
]

const mockRecentArticles: ProjectRecentArticle[] = [
  {meta_id: {id: 1, type: 'article'}, modification_date: '2023-03-01'},
  {meta_id: {id: 2, type: 'warning'}, modification_date: '2023-04-01'},
  {meta_id: {id: 3, type: 'warning'}, modification_date: '2023-04-01'},
]

describe('getUnreadArticlesLength', () => {
  it('should return 0 when recentArticles is empty', () => {
    const result = getUnreadArticlesLength(mockReadArticles, [])

    expect(result).toBe(0)
  })

  it('should return the correct number of unread articles', () => {
    const result = getUnreadArticlesLength(mockReadArticles, mockRecentArticles)

    expect(result).toBe(1)
  })

  it('should handle different types correctly, when there are matching IDs', () => {
    const modifiedRecentArticles: ProjectRecentArticle[] = [
      ...mockRecentArticles,
      {meta_id: {id: 3, type: 'article'}, modification_date: '2023-05-01'},
    ]
    const result = getUnreadArticlesLength(
      mockReadArticles,
      modifiedRecentArticles,
    )

    expect(result).toBe(2)
  })
})
