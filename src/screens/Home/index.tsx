import React from 'react'
import { Box, Center, HStack, Icon, Menu, Pressable, Text, VStack } from 'native-base'
import { ListItem } from '../../components/ListItem'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { usePasswords } from '../../contexts/PasswordsContext'
import { SwipeListView } from 'react-native-swipe-list-view'
import { usePermission } from '../../hooks/usePermission'
import { useAuth } from '../../contexts/AuthContext'
import { PageTitle } from '../../components/Title'
import { Avatar } from 'native-base'
import { MyButton } from '../../components/MyButton'
import { MotiView } from 'moti'

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
    <Box flex={1} bg={'secondary.900'} px={'20px'} py={'50px'} justifyContent={'space-between'} >
      <VStack >
        <HStack justifyContent={'space-between'}>
          <Box>
            <PageTitle text={userCredential?.given_name ? `Olá, ${userCredential?.given_name}` : ''} />
            <Text color={'secondary.500'} fontFamily={'Inter_400Regular'} fontSize={'13px'}>Suas senhas cadastradas{'\n'}estão logo abaixo.</Text>
          </Box>
          <Menu w="50" defaultIsOpen={false} trigger={triggerProps => {
            return <Pressable  accessibilityLabel="Mais opções" {...triggerProps}>
              <Avatar borderColor={'primary.300'} borderWidth={2} borderStyle={'solid'} bgColor={'primary.400'} source={{ uri: userCredential?.picture || undefined, width: 30, height: 30,}} />
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
            contentContainerStyle={{ paddingTop: 40, paddingBottom: 100,}}
            style={{ height: '100%', }}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, }) => (
              <>
                <MotiView
                  from={{ transform: [ { translateX: -400, }, ], }}
                  animate={{ transform: [ { translateX: 0, }, ], }}
                  delay={500}
                >
                  <ListItem
                    iconColor={item.iconColor}
                    iconName={item.iconName}
                    title={item.description}
                    password={item.password}
                  />
                </MotiView>
                <Box style={{ height: 20, }}/>
              </>
            )}
            renderHiddenItem={ (data) => (
              <MotiView
                from={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                delay={1800}
              >
                <Pressable onPress={() => {
                  getAuth()
                    .then(response => {
                      response.success && removePassword(String(data.item.id))
                    })
                }} alignItems={'flex-end'}>
                  <Icon as={MaterialCommunityIcons} mt={'15px'} name={'delete-outline'} size={'32px'} color={'red.500'}/>
                </Pressable>
              </MotiView>
            )}
            rightOpenValue={-75}
          />
          
        }
      </VStack>

      
      <Box
        top={125} 
        bottom={400}
        right={0}
        pointerEvents={'none'}
        left={0}
        position={'absolute'}
        bg={{
          linearGradient: {
            colors: [ 'transparent', '#070808', ],
            start: [ 0, 0.18, ],
            end: [ 0, 0, ],
          },
        }} />
      
      <Box
        bottom={0}
        right={0}
        left={0}
        position={'absolute'}
        py={5}
        px={5}
        justifyContent={'flex-end'}
        bg={{
          linearGradient: {
            colors: [ 'transparent', '#070808', ],
            start: [ 0, 0.1, ],
            end: [ 0, 1, ],
          },
        }}>
        <MyButton
          onPress={() => navigate('newPass')} 
          leftIcon={<MaterialCommunityIcons name='lock-plus'/>}
          iconSize={26}
          leftIconColor={'white'}
          title='Nova Senha'
          textColor={'white'}
          bgColor={'primary.400'}      
        />
      </Box>
    </Box>
  )
}
