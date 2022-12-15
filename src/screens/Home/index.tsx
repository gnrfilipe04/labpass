import React from 'react'
import { Box, Center, HStack, Icon, Menu, Pressable, Text, VStack } from 'native-base'
import { ListItem } from '../../components/ListItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePasswords } from '../../contexts/PasswordsContext'
import { SwipeListView } from 'react-native-swipe-list-view'
import { usePermission } from '../../hooks/usePermission'
import { useAuth } from '../../contexts/AuthContext'
import { PageTitle } from '../../components/PageTitle'
import { Avatar } from 'native-base'
import { MyButton } from '../../components/MyButton'

export function Home(){
  const { navigate, } = useNavigation()

  const { userCredential, logout, } = useAuth()
  const { passwordList, removePassword, } = usePasswords()
  
  const { getAuth, } = usePermission()

  const handleUsername = (completeName: string) => {
    const [ firstName, familyName, ] = completeName.split(' ')
    return {
      firstName,
      familyName,
    }
  }

  const onLogout = () => {
    logout()
    navigate('welcome')

  }

  return (
    <Box flex={1} bg={'secondary.900'} px={'20px'} py={'50px'} justifyContent={'space-between'}>
      <VStack  space={'40px'}>
        <HStack justifyContent={'space-between'}>
          <Box>
            <HStack space={'5px'} alignItems={'center'}>
              <PageTitle text={`Olá, ${handleUsername(userCredential?.user.displayName as string).firstName}`} />
            </HStack>
            <Text color={'secondary.500'} fontFamily={'Inter_400Regular'} fontSize={'12px'}>Suas senhas cadastradas{'\n'}estão logo abaixo.</Text>
          </Box>
          <Menu w="50" defaultIsOpen={false} trigger={triggerProps => {
            return <Pressable  accessibilityLabel="Mais opções" {...triggerProps}>
              <Avatar bgColor={'primary.400'} source={{ uri: userCredential?.user?.photoURL || undefined,}} />
            </Pressable>
          }}>
            <Menu.Item onPress={onLogout}>Sair</Menu.Item>
          </Menu>
          
        </HStack>
        {!passwordList.length
          ? <Center h={'70%'}>
            <Text color={'secondary.500'} fontFamily={'Inter_400Regular'} fontSize={'16px'}>Ops, não há senhas cadastradas!</Text>
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

      <MyButton
        onPress={() => navigate('newPass')} 
        leftIcon={<MaterialCommunityIcons name='lastpass'/>}
        iconSize={26}
        leftIconColor={'white'}
        title='Nova Senha'
        textColor={'white'}
        bgColor={'primary.400'}      
      />
    </Box>
  )
}
