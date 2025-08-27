import { useReducer } from 'react'
import type { InformationModal } from '../interfaces/information-modal.interface'
import type { ActionType } from '../types/action-type.type'

const useInformationModal = () => {
  const initialState: InformationModal = {
    title: '',
    visible: false,
    loading: false,
    message: ''
  }

  const reducer = (state: InformationModal, action: ActionType): InformationModal => {
    switch (action.type) {
      case 'SET_TITLE':
        return { ...state, title: action.payload }
      case 'SET_VISIBLE':
        return { ...state, visible: action.payload }
      case 'SET_LOADING':
        return { ...state, loading: action.payload }
      case 'SET_MESSAGE':
        return { ...state, message: action.payload }
      case 'SET_RESET':
        return initialState
      default:
        return state
    }
  }

  const [informationModal, dispatch] = useReducer(reducer, initialState)

  const setInformationModal = (payload: InformationModal) => {
    dispatch({ type: 'SET_TITLE', payload: payload.title })
    dispatch({ type: 'SET_VISIBLE', payload: payload.visible })
    dispatch({ type: 'SET_LOADING', payload: payload.loading })
    dispatch({ type: 'SET_MESSAGE', payload: payload.message })
  }

  const resetInformationModal = () => {
    dispatch({ type: 'SET_RESET' })
  }

  return { informationModal, setInformationModal, resetInformationModal }
}

export default useInformationModal
