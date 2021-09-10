import React, {createContext, useState} from 'react'
import {Address} from '../types'

type Context = {
  address: Address | undefined
  changeAddress: (text: Address | undefined) => void
  changeSaveInStore: (state: boolean) => void
  saveInStore: boolean | undefined
}

export const AddressContext = createContext<Context>({
  address: undefined,
  changeAddress: () => {},
  changeSaveInStore: () => {},
  saveInStore: true,
})

export const AddressProvider = ({children}: {children: React.ReactNode}) => {
  const [saveInStore, setSaveInStore] = useState<boolean>(true)
  const [address, setAddress] = useState<Address | undefined>()

  const changeSaveInStore = (state: boolean) => {
    setSaveInStore(state)
  }

  const changeAddress = (newAddress: Address | undefined) => {
    setAddress(newAddress)
  }

  return (
    <AddressContext.Provider
      value={{address, changeAddress, changeSaveInStore, saveInStore}}>
      {children}
    </AddressContext.Provider>
  )
}
