import React, { useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Box, VStack } from 'native-base'
import { MyButton } from '../../../components/MyButton'
import { useGoogleSignIn } from '../../../hooks/useGoogleSignIn'
import { useFacebookSignIn } from '../../../hooks/useFacebookSignIn'
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from '@env'
import { MyAlertDialog } from '../../../components/MyAlertDialog'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Platform } from 'react-native'
import { MotiView } from 'moti'

interface SocialButtonsProps {
  loginEnable: boolean
}

export function SocialButtons({ loginEnable, }: SocialButtonsProps){

  const { navigate, } = useNavigation()

  const [ isOpenErrorLogin, setIsOpenErrorLogin, ] = useState(false)

  const [ loading, setLoading, ] = useState(false)

  const cancelRef = useRef(null)

  const onCloseErrorLogin = () => {
    setIsOpenErrorLogin(false)
  }

  const onConfirmErrorLogin = () => {
    setIsOpenErrorLogin(false)
  }

  const { onLoginGoogle, } = useGoogleSignIn({
    clientId: GOOGLE_CLIENT_ID,
  })

  const { onLoginFacebook, } = useFacebookSignIn({
    clientId: FACEBOOK_CLIENT_ID,
  })

  return (
    <VStack space={'10px'} mt='50px' mx={'20px'}>
      <MotiView
        from={{
          transform: [ { translateX: -50, }, ],
        }}

        animate={{
          transform: [ { translateX: 0, }, ],
        }}
      >
        <MyButton
          title='Continuar com Google'
          onPress={() => {
            setLoading(true)
            onLoginGoogle()
              .then((user) => user && navigate('home'))
              .catch(() => setIsOpenErrorLogin(true))
              .finally(() => setLoading(false))
          }}
          disable={!loginEnable}
          iconSize={30}
          leftIcon={<MaterialCommunityIcons name={'google'}/>}
          leftIconColor={'primary.300'}
          textColor={'white'} 
          bgColor={'secondary.600'}
        />
      </MotiView>

      <MotiView
        from={{
          transform: [ { translateX: 50, }, ],
        }}

        animate={{
          transform: [ { translateX: 0, }, ],
        }}
      >
        <MyButton
          title='Continuar com Facebook'
          onPress={() => {
            setLoading(true)
            onLoginFacebook()
              .then((user) => user && navigate('home'))
              .catch(() => setIsOpenErrorLogin(true))
              .finally(() => setLoading(false))
          }}
          disable={!loginEnable}
          iconSize={30}
          leftIcon={<MaterialCommunityIcons name='facebook'/>}
          leftIconColor={'primary.300'}
          textColor={'white'} 
          bgColor={'secondary.600'}
        />
      </MotiView>

      {Platform.OS === 'ios' && <MyButton
        title='Continuar com Apple'
        onPress={() => {}}
        iconSize={30}
        disable={!loginEnable}
        leftIcon={<MaterialCommunityIcons name='apple'/>}
        leftIconColor={'primary.300'}
        textColor={'white'} 
        bgColor={'secondary.600'}
      />}

      <MyAlertDialog 
        cancelRef={cancelRef}
        onClose={onCloseErrorLogin}
        isOpen={isOpenErrorLogin}
        onConfirm={onConfirmErrorLogin}
        confirmText={'Ok'}
        title={'Erro na autentica????o!'}
        description={'N??o foi poss??vel realizar o login.\nTente realizar outro m??todo de autentica????o'}
      />

      <Box h={'10'}>
        {loading && <ActivityIndicator color={'#262626'}/>}
      </Box>
    </VStack>
  )
}
