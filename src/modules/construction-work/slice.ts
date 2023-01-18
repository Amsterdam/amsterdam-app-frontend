import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from '@/store'

export type ReadArticle = {
  id: string
  publicationDate: string
}

type ConstructionWorkSliceState = {
  readArticles: ReadArticle[]
  searchText: string
}

const initialState: ConstructionWorkSliceState = {
  readArticles: [],
  searchText: '',
}

export const constructionWorkSlice = createSlice({
  name: 'constructionWork',
  initialState,
  reducers: {
    addReadArticle: (state, {payload: article}: PayloadAction<ReadArticle>) => {
      state.readArticles.push(article)
    },
    deleteReadArticle: (state, {payload: articleId}: PayloadAction<string>) => {
      state.readArticles = state.readArticles.filter(
        article => article.id !== articleId,
      )
    },
    setSearchText: (state, {payload: searchText}: PayloadAction<string>) => {
      state.searchText = searchText
    },
  },
})

export const {addReadArticle, deleteReadArticle, setSearchText} =
  constructionWorkSlice.actions

export const selectConstructionWorkReadArticles = ({
  constructionWork,
}: RootState) => constructionWork.readArticles

export const selectConstructionWorkSearchText = ({
  constructionWork,
}: RootState) => constructionWork.searchText
