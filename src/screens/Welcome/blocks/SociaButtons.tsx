import React, { useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { VStack } from 'native-base'
import { MyButton } from '../../../components/MyButton'
import { useGoogleSignIn } from '../../../hooks/useGoogleSignIn'
import { useFacebookSignIn } from '../../../hooks/useFacebookSignIn'
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from '@env'
import { useAuth } from '../../../contexts/AuthContext'
import { MyAlertDialog } from '../../../components/MyAlertDialog'
import { useNavigation } from '@react-navigation/native'

export function SocialButtons(){

  const { navigate, } = useNavigation()

  const { userCredential, } = useAuth()

  const [ isOpen, setIsOpen, ] = useState(false)

  const cancelRef = useRef(null)

  const onClose = () => {
    setIsOpen(false)
  }

  const onConfirm = () => {
    setIsOpen(false)
  }

  const { onLoginGoogle, } = useGoogleSignIn({
    clientId: GOOGLE_CLIENT_ID,
  })

  const { onLoginFacebook, } = useFacebookSignIn({
    clientId: FACEBOOK_CLIENT_ID,
  })

  useEffect(() => {
    userCredential && navigate('home')
  }, [ userCredential, ])

  return (
    <VStack space={'10px'} mt='40px' mx={'20px'}>

      <MyButton
        title='Continuar com Facebook'
        onPress={() => onLoginFacebook()
          .catch(() => setIsOpen(true))}
        iconSize={26}
        leftIcon={<MaterialCommunityIcons name='facebook'/>}
        leftIconColor={'primary.300'}
        textColor={'white'} 
        bgColor={'#262626'}
      />

      <MyButton
        title='Continuar com Google'
        onPress={() => onLoginGoogle()
          .catch(() => setIsOpen(true))}
        iconSize={26}
        leftIcon={<MaterialCommunityIcons name={'gmail'}/>}
        leftIconColor={'primary.300'}
        textColor={'white'} 
        bgColor={'#262626'}
      />

      <MyButton
        title='Continuar com Apple'
        onPress={() => {}}
        iconSize={26}
        leftIcon={<MaterialCommunityIcons name='apple'/>}
        leftIconColor={'primary.300'}
        textColor={'white'} 
        bgColor={'#262626'}
      />

      <MyAlertDialog 
        cancelRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        onConfirm={onConfirm}
        confirmText={'Ok'}
        title={'Erro na autenticação!'}
        description={'Não foi possível realizar o login.\nTente realizar outro método de autenticação'}
      />

    </VStack>
  )
}
