import React, { createContext, ReactNode, useContext, useState } from 'react'
import { UserDTO } from '../dtos/UserDTO'

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContext {
  user: UserDTO
  addUser: (user: UserDTO) => void
}

const AuthContext = createContext({} as AuthContext)

export function AuthProvider ({ children, }: AuthProviderProps) {
  const [ user, setUser, ] = useState<UserDTO>({} as UserDTO)

  function addUser(user: UserDTO){
    setUser(user)
  }

  return (
    <AuthContext.Provider
      value={{
        addUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
