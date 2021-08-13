export type NewsArticleList = NewsArticle[]

export type NewsArticle = {
  category: string
  feedid: string
  publication_date: string
  modification_date: string
  image_url: string
  title: string
  content: string
  source_url: string
  related_articles: string
  author: string
  photo_author: string
  images: string[]
}
