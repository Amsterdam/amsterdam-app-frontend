import {configureStore} from '@reduxjs/toolkit'
import {articlesReducer} from '../components/features/article/articleSlice'
// ...

export const store = configureStore({
  reducer: {
    aritcles: articlesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
