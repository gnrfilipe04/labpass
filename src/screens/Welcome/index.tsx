import React, { useEffect, useRef, useState } from 'react'
import { Center, Text, VStack, HStack } from 'native-base'
import { Logo } from '../../components/Logo'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { usePermission } from '../../hooks/usePermission'
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher'
import { SocialButtons } from './blocks/SociaButtons'
import { MyAlertDialog } from '../../components/MyAlertDialog'

export function Welcome(){
  const { navigate, } = useNavigation()
  const { getAuth, getAuthRegister, } = usePermission()

  const [ isOpen, setIsOpen, ] = useState(false)

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
      <VStack flex={1} bg={'secondary.900'} justifyContent={'center'}>
        <Center>
          <MyAlertDialog
            title='Padrão de segurança'
            description={'Não foi possível encontrar nenhum registro de padrão de segurança.\nAdicione um registro de padrão de segurança no seu dispositivo para ter acesso ao aplicativo.'} 
            cancelRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            onCancel={onClose}
            onConfirm={onConfirm}
          />
          <Logo />
          <VStack>
            <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'secondary.500'}>Gerencie suas senhas</Text>
            <HStack space={'8px'}>
              <Text mt={'12px'} fontSize={20} fontFamily={'Inter_400Regular'} lineHeight={20} color={'secondary.500'}>em</Text>
              <Text mt={'12px'} fontSize={20} fontFamily={'Inter_900Black'} lineHeight={20} color={'secondary.50'}>um só lugar.</Text>
            </HStack>
          </VStack>
        </Center>

        <SocialButtons />
      </VStack>
    </>
  )
}
