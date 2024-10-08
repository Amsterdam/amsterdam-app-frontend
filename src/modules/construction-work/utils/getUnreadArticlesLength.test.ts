import {ReadArticle} from '@/modules/construction-work/slice'
import {ArticleStub} from '@/modules/construction-work/types/api'
import {getUnreadArticlesLength} from '@/modules/construction-work/utils/getUnreadArticlesLength'

const mockReadArticles: ReadArticle[] = [
  {id: 'article1', publicationDate: '2023-01-01'},
  {id: 'warning2', publicationDate: '2023-02-01'},
]

const mockRecentArticles = [
  {meta_id: {id: 1, type: 'article'}, modification_date: '2023-03-01'},
  {meta_id: {id: 2, type: 'warning'}, modification_date: '2023-04-01'},
  {meta_id: {id: 3, type: 'warning'}, modification_date: '2023-04-01'},
] as ArticleStub[]

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
    const modifiedRecentArticles = [
      ...mockRecentArticles,
      {meta_id: {id: 3, type: 'article'}, modification_date: '2023-05-01'},
    ] as ArticleStub[]

    const result = getUnreadArticlesLength(
      mockReadArticles,
      modifiedRecentArticles,
    )

    expect(result).toBe(2)
  })
})
