import React, { useEffect, useRef } from 'react'
import { Center, Text, Button, VStack, HStack, AlertDialog } from 'native-base'
import { Logo } from '../../components/Logo'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usePermission } from '../../hooks/usePermission'
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher'
import { SocialButtons } from './blocks/SociaButtons'

export function Welcome(){
  const { navigate, } = useNavigation()
  const { getAuth, getAuthRegister, } = usePermission()

  const [ isOpen, setIsOpen, ] = React.useState(false)

  const cancelRef = useRef(null)

  const onClose = () => {
    setIsOpen(false)
  }

  const onConfirm = () => {
    setIsOpen(false)
    startActivityAsync(ActivityAction.SECURITY_SETTINGS)
  }

  const isLoginWithPattern = async () => {
    return await AsyncStorage.getItem('@lockpick_isLoginWithPattern')
  }

  const getAuthMethods = async () => {
    return await getAuthRegister()
  }

  function toRegister(){
    navigate('register')
  }

  function toLogin(){
    navigate('login')
  }

  async function takeAuthPattern(toScreen: keyof ReactNavigation.RootParamList){

    const authMethod = await getAuthMethods()

    if(authMethod){
      getAuth()
        .then(response => {
          if(response.success){
            navigate(toScreen)
          }
        })
    }else {
      setIsOpen(!isOpen)
    }
  }

  useEffect(() => {
    isLoginWithPattern()
      .then(loginPattern => { loginPattern && takeAuthPattern('home') })
  }, [])

  return (
    <>
      <VStack flex={1} bg={'primary.900'} justifyContent={'center'}>
        <Center>
          <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Padrão de segurança</AlertDialog.Header>
              <AlertDialog.Body>
              Não foi possível encontrar nenhum registro de padrão de segurança.
              Adicione um registro de padrão de segurança no seu dispositivo para ter acesso ao aplicativo.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                  Cancelar
                  </Button>
                  <Button bgColor={'secondary.400'} onPress={onConfirm}>
                  Confirmar
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
          <Logo />
          <VStack>
            <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'primary.500'}>Gerencie suas senhas</Text>
            <HStack space={'8px'}>
              <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'primary.500'}>em</Text>
              <Text mt={'12px'} fontSize={20} fontFamily={'Inter_900Black'} lineHeight={20} color={'primary.50'}>um só lugar.</Text>
            </HStack>
          </VStack>
        </Center>
        {/* <Button 
          mt={'49px'}
          bg={'secondary.400'} 
          ml={'82px'} 
          mr={'82px'} 
          fontFamily={'Inter_400Regular'}
          _pressed={{
            background: 'purple.700',
          }} 
          onPress={toLogin}>Entrar</Button>

        <Button 
          mt={'10px'}
          bg={'primary.500'} 
          ml={'82px'} 
          mr={'82px'} 
          fontFamily={'Inter_400Regular'}
          _pressed={{
            background: 'purple.700',
          }} 
          onPress={toRegister}>Registre-se</Button> */}

        <SocialButtons />
      </VStack>
    </>
  )
}
