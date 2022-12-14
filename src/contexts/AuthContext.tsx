import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { signOut as authSignOut, User } from 'firebase/auth'
import { UserCredential } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { auth } from '../../firebaseconfig'

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContext {
  userCredential: UserCredential | null
  getAuthCurrentUser: () => User | null
  logout: () => Promise<void>
  saveUserCredential: (user: UserCredential | null) => void
}

const AuthContext = createContext({} as AuthContext)

export function AuthProvider ({ children, }: AuthProviderProps) {

  const [ userCredential, setUserCredential, ] = useState<UserCredential | null>(null)

  function saveUserCredential(user: UserCredential | null){
    setUserCredential(user)
    user && AsyncStorage.setItem('@labpass_user', JSON.stringify(user))
  }

  const loadUser = async (): Promise<UserCredential | null> => {
    const userStorage: string | null = await AsyncStorage.getItem('@labpass_user')
    const user = userStorage ? JSON.parse(userStorage) : null

    return user
  }

  const getAuthCurrentUser = (): User | null => {
    return auth.currentUser
  }

  async function logout(){
    saveUserCredential(null)
    authSignOut(auth)
    await AsyncStorage.removeItem('@labpass_user')
    return await auth.signOut()
  }

  useEffect(() => {

    loadUser()
      .then(saveUserCredential)
      .catch(console.log)

  }, [])
  

  return (
    <AuthContext.Provider
      value={{
        saveUserCredential,
        logout,
        getAuthCurrentUser,
        userCredential,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
