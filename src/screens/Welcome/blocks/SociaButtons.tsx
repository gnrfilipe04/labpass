import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { VStack } from 'native-base'
import { MyButton } from '../../../components/MyButton'
import { socialIcons } from '../../../mock/socialIcons'

export function SocialButtons(){

  return (
    <VStack space={'10px'} mt='40px' mx={'20px'}>

      <MyButton
        title='Entrar com Facebook'
        onPress={() => {}}
        iconSize={26}
        leftIcon={<MaterialCommunityIcons name='facebook'/>}
        leftIconColor={'white'}
        textColor={'white'} 
        bgColor={socialIcons['Facebook'].iconColor}
      />

      <MyButton
        title='Entrar com Google'
        onPress={() => {}}
        iconSize={26}
        leftIcon={<MaterialCommunityIcons name={'gmail'}/>}
        leftIconColor={'white'}
        textColor={'white'} 
        bgColor={socialIcons['G-mail'].iconColor}
      />

      <MyButton
        title='Entrar com Apple'
        onPress={() => {}}
        iconSize={26}
        leftIcon={<MaterialCommunityIcons name='apple'/>}
        leftIconColor={'white'}
        textColor={'white'} 
        bgColor={socialIcons['Apple'].iconColor}
      />
      
    </VStack>
  )
}
