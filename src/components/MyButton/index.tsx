import React, { ReactNode } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { HStack, Icon, Pressable, Text } from 'native-base'
import { ColorType } from 'native-base/lib/typescript/components/types'

interface MyButtonProps {
  title: string
  bgColor: ColorType
  textColor: ColorType
  leftIcon?: ReactNode
  leftIconColor?: ColorType
  rightIcon?: ReactNode
  rightIconColor?: ColorType
  iconSize?: number
  onPress: () => void
}

export function MyButton({
  title,
  bgColor,
  textColor,
  leftIcon,
  leftIconColor,
  iconSize,
  rightIcon,
  rightIconColor,
  onPress,
}: MyButtonProps){
  return (
    <Pressable onPress={onPress} bg={bgColor || 'secondary.500'} borderRadius={'full'} p='10px'>
      <HStack justifyContent={'center'} alignItems='center'>
        { leftIcon && <Icon as={leftIcon} color={leftIconColor} size={iconSize} position='absolute' left={0}/> }
        <Text textAlign={'center'} color={textColor} fontFamily={'Inter_400Regular'}>{title}</Text>
        { rightIcon && <Icon as={rightIcon} color={rightIconColor} size={iconSize} position='absolute' right={0}/> }
      </HStack>
    </Pressable>
  )
}
