import * as Google from 'expo-auth-session/providers/google'
import { GoogleAuthProvider, signInWithCredential, UserCredential, OAuthCredential } from 'firebase/auth'
import { auth } from '../../firebaseconfig'
import { useAuth } from '../contexts/AuthContext'

interface UseGoogleSigninProps {
  clientId: string;
  language?: string
}

export function useGoogleSignIn({ 
  clientId,
  language,
}: UseGoogleSigninProps){

  const { saveUserCredential, } = useAuth()

  const [ request, response, promptAsync, ] = Google.useIdTokenAuthRequest(
    {
      clientId,
      language: language || 'pt-BR',
    }
  )

  const getCredential = (token: string): OAuthCredential | null => {
    const credential = GoogleAuthProvider.credential(token)
    return credential
  }

  const singInAuthSession = async (credential: OAuthCredential): Promise<UserCredential | null> => {
    return signInWithCredential(auth, credential)

  }

  const onLoginGoogle = async () => {
    try {
      const responseGoogle = await promptAsync()
  
      if(responseGoogle.type !== 'success') return null
  
      const { id_token, } = responseGoogle.params
      const credential = getCredential(id_token)

      if (!credential) return null
      const user = credential ? await singInAuthSession(credential) : null
      saveUserCredential(user)
      return user

    }catch(e){
      console.log(e)
    }

  }
  
  return {
    onLoginGoogle,
  }

}
