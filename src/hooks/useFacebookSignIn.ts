import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'
import { FacebookAuthProvider, OAuthCredential, signInWithCredential, UserCredential } from 'firebase/auth'
import { auth } from '../../firebaseconfig'
import { useAuth } from '../contexts/AuthContext'

interface UseFacebookSigninProps {
  clientId: string;
  language?: string
}

export function useFacebookSignIn({
  clientId,
  language,
}: UseFacebookSigninProps) {

  const { saveUserCredential, } = useAuth()

  const [ request, response, promptAsync, ] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId,
    language: language || 'pt-BR',
  })

  const getCredential = (token: string): OAuthCredential | null => {
    const credential = FacebookAuthProvider.credential(token)
    return credential
  }

  const singInAuthSession = async (credential: OAuthCredential): Promise<UserCredential | null> => {
    return signInWithCredential(auth, credential)

  }

  const onLoginFacebook = async () => {
    const responseGoogle = await promptAsync()

    if (responseGoogle.type !== 'success') return null

    const { access_token, } = responseGoogle.params
    const credential = getCredential(access_token)
    
    if (!credential) return null
    const user = credential && await singInAuthSession(credential)
    saveUserCredential(user)
    return user
    
  }

  return {
    onLoginFacebook,
    promptAsync,
  }

}
