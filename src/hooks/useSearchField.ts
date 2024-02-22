import {useContext} from 'react'
import {SearchFieldContext} from '@/providers/searchField.provider'

export const useSearchField = () => useContext(SearchFieldContext)
