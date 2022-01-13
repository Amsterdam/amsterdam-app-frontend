import React, {createContext, useCallback, useEffect, useState} from 'react'
import {useAsyncStorage} from '../hooks'
import {Address} from '../types'

type ChangeAddress = (newAddress: Address) => void

type Context = {
  address: Address | undefined
  saveAddress: ChangeAddress
  changeTempAddress: ChangeAddress
  removeAddress: () => void
  tempAddress: Address | undefined
}

export const AddressContext = createContext<Context>({
  address: undefined,
  changeTempAddress: () => {},
  removeAddress: () => {},
  saveAddress: () => {},
  tempAddress: undefined,
})

export const AddressProvider = ({children}: {children: React.ReactNode}) => {
  const asyncStorage = useAsyncStorage()
  const [address, setAddress] = useState<Address | undefined>()
  const [tempAddress, setTempAddress] = useState<Address | undefined>()
  const [isAddressSaved, setAddressSaved] = useState<boolean | undefined>(false)

  const retrieveAddress = useCallback(async () => {
    const newAddress = await asyncStorage.getValue('address')
    setAddress(newAddress)
  }, [asyncStorage])

  // Initially retrieve address from local storage
  useEffect(() => {
    retrieveAddress()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Also retrieve new address from local storage when new one is saved
  useEffect(() => {
    isAddressSaved && retrieveAddress()
    setAddressSaved(false)
  }, [isAddressSaved, retrieveAddress])

  const saveAddress: ChangeAddress = async newAddress => {
    await asyncStorage.storeData('address', newAddress)
    setAddressSaved(true)
  }

  const changeTempAddress: ChangeAddress = newAddress => {
    setTempAddress(newAddress)
  }

  const removeAddress = () => {
    asyncStorage.removeValue('address')
    setAddressSaved(true)
  }

  return (
    <AddressContext.Provider
      value={{
        address,
        changeTempAddress,
        saveAddress,
        removeAddress,
        tempAddress,
      }}>
      {children}
    </AddressContext.Provider>
  )
}
