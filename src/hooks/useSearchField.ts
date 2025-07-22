import {useContext} from 'react'
import {SearchFieldContext} from '@/providers/searchField.context'

export const useSearchField = () => useContext(SearchFieldContext)
