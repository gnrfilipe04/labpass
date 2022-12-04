import React, { useEffect, useState } from 'react'
import { Box, Center, HStack, Icon, Pressable, Text, VStack } from 'native-base'
import { ListItem } from '../../components/ListItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePasswords } from '../../contexts/PasswordsContext'
import { Fab } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SwipeListView } from 'react-native-swipe-list-view'
import { usePermission } from '../../hooks/usePermission'
import { useAuth } from '../../contexts/AuthContext'
import { PageTitle } from '../../components/Title'

export function Home(){
  const { navigate, } = useNavigation()

  const { user, } = useAuth()
  const { passwordList, removePassword, } = usePasswords()
  
  const { getAuth, } = usePermission()

  const onLogout = () => {
    navigate('welcome')
  }

  return (
    <Box flex={1} bg={'primary.900'} px={'20px'} py={'50px'} justifyContent={'space-between'}>
      <VStack  space={'40px'}>
        <HStack justifyContent={'space-between'}>
          <Box>
            <HStack space={'5px'} alignItems={'center'}>
              <PageTitle text={`Olá ${user.username}`} />
              <Icon as={MaterialCommunityIcons} name={'square-edit-outline'} size={'16px'} color={'primary.50'} onPress={() => navigate('register')}/>
            </HStack>
            <Text color={'primary.500'} fontFamily={'Inter_400Regular'} fontSize={'12px'}>Suas senhas cadastradas{'\n'}estão logo abaixo.</Text>
          </Box>
          <Icon as={MaterialCommunityIcons} name={'cog-outline'} mt={'15px'} size={'24px'} color={'primary.50'} onPress={onLogout}/>
        </HStack>
        {!passwordList.length
          ? <Center h={'70%'}>
            <Text color={'primary.500'} fontFamily={'Inter_400Regular'} fontSize={'16px'}>Ops, não há senhas cadastradas!</Text>
          </Center>
          : <SwipeListView 
            data={passwordList}
            showsVerticalScrollIndicator={false}
            style={{ height: '80%', }}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, }) => (
              <>
                <ListItem
                  iconColor={item.iconColor}
                  iconName={item.iconName}
                  title={item.description}
                  password={item.password}
                />
                <Box style={{ height: 20, }}/>
              </>
            )}
            renderHiddenItem={ (data) => (
              <Pressable onPress={() => {
                getAuth()
                  .then(response => {
                    response.success && removePassword(String(data.item.id))
                  })
              }} alignItems={'flex-end'}>
                <Icon as={MaterialCommunityIcons} mt={'15px'} name={'delete-outline'} size={'32px'} color={'red.500'}/>
              </Pressable>
            )}
            rightOpenValue={-75}

          />
        }
      </VStack>
      <Fab 
        renderInPortal={false} 
        shadow={2}
        size="sm" 
        bg={'secondary.400'}
        colorScheme={'purple'}
        icon={<Icon color="white" as={MaterialCommunityIcons} name="plus-thick" size="md" />} 
        onPress={() => navigate('newPass')} 
      />
    </Box>
  )
}
