import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '../../../store'
import {ArticleSummary, NewsArticle} from '../../../types'

// Define a type for the slice state
interface ArticleState {
  singleArticle: NewsArticle
  articles: ArticleSummary[]
  loading: boolean
  error: any
}

// Define the initial state using that type
const initialState: ArticleState = {
  singleArticle: {} as NewsArticle,
  articles: [],
  loading: false,
  error: '',
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    requestArticles: state => {
      state.loading = true
    },
    requestArticlesSucceeded: (
      state,
      action: PayloadAction<ArticleSummary[]>,
    ) => {
      state.loading = false
      state.articles = action.payload
    },
    requestArticlesFailed: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const {
  requestArticles,
  requestArticlesFailed,
  requestArticlesSucceeded,
} = articlesSlice.actions

export const selectArticles = (state: RootState) => state.articles
export const {reducer: articlesReducer} = articlesSlice
