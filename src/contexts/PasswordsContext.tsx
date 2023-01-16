import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { PasswordDTO } from '../dtos/PasswordDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { decrypt, encrypt } from '../utils/crypto';

interface PasswordsProviderProps {
    children: ReactNode;
}

interface PasswordsContext {
  passwordList: PasswordDTO[]
  addPassword: (password: PasswordDTO) => void
  removePassword: (idPassword: string) => void
}

const PasswordsContext = createContext({} as PasswordsContext)

export function PasswordsProvider ({ children, }: PasswordsProviderProps) {
  const [ passwordList, setPasswordList, ] = useState<PasswordDTO[]>([])

  function addPassword(password: PasswordDTO){
    setPasswordList([ password,...passwordList, ])
  }

  function removePassword(idPassword: string){
    const passwordsFiltered = passwordList.filter(pass => pass.id !== idPassword)
    setPasswordList(passwordsFiltered)
  }

  async function setPassStorage(){
    const encryptedPasswords = passwordList.map(pass => ({...pass, password: encrypt(pass.password)}))
    
    AsyncStorage.setItem('@lockpick_passwords', JSON.stringify(encryptedPasswords))
  }

  async function getPassStorage(){

    const storagePass = await AsyncStorage.getItem('@lockpick_passwords')

    if(!storagePass) return

    const passToJson: PasswordDTO[] = JSON.parse(storagePass)

    const decryptedPasswords = passToJson.map(pass => ({...pass, password: decrypt(pass.password)}))

    setPasswordList(decryptedPasswords)
      
  }

  useEffect(() => {
    getPassStorage()
  }, [])

  useEffect(() => {
    setPassStorage()
  }, [ passwordList.length, ])

  return (
    <PasswordsContext.Provider
      value={{
        passwordList,
        addPassword,
        removePassword,
      }}
    >
      {children}
    </PasswordsContext.Provider>
  )
}

export const usePasswords = () => useContext(PasswordsContext)
