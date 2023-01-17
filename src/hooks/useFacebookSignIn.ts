import { startAsync } from 'expo-auth-session'
import { useAuth } from '../contexts/AuthContext'
import { UserDTO } from '../dtos/UserDTO';
import axios from 'axios';
import { FACEBOOK_CLIENT_SECRET, FACEBOOK_REDIRECT_URI } from '@env';

interface UseFacebookSigninProps {
  clientId: string;
  language?: string
}

interface UserFacebook {
  email: string,
  id: string,
  name: string,
  picture: {
    data: {
      height: number,
      is_silhouette: boolean,
      url: string,
      width: number,
    },
  },
}

export function useFacebookSignIn({
  clientId,
  language,
}: UseFacebookSigninProps) {

  const { saveUserCredential, } = useAuth()

  async function getCode(){
    
    let response = await startAsync({ authUrl: `https://www.facebook.com/v15.0/dialog/oauth?client_id=${clientId}&redirect_uri=${FACEBOOK_REDIRECT_URI}`})

    if(response.type !== 'success') return null

    return response.params.code
  }

  async function getToken(){

    const code = await getCode()
    
    if(!code) return null

    let response = await axios.get(`https://graph.facebook.com/v15.0/oauth/access_token?client_id=${clientId}&redirect_uri=${FACEBOOK_REDIRECT_URI}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}`)

    return await response.data.access_token

  }

  async function getUserInfo(){

    const access_token = await getToken()
    
    if(!access_token) return null

    let response = await axios.get(`https://graph.facebook.com/me?access_token=${access_token}&fields=name,email,picture`)

    const userInfo: UserFacebook | null = await response.data

    return userInfo
    
  }

  const onLoginFacebook = async () => {
    try {
      const facebookUser = await getUserInfo()

      if(!facebookUser) return null

      const [ given_name, family_name ] = facebookUser.name.split(' ')

      const user: UserDTO = {
        id: facebookUser?.id,
        email: facebookUser?.email,
        given_name,
        family_name,
        locale: '',
        name: facebookUser?.name,
        picture: facebookUser?.picture.data.url,
        verified_email: true
      }

      saveUserCredential(user)

      return user

    }catch(e){
      console.log(e)
    }

  }
  
  return {
    onLoginFacebook
  }
}