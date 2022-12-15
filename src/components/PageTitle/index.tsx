import React from 'react'
import { Text } from 'native-base'
import { InterfaceTextProps } from 'native-base/lib/typescript/components/primitives/Text/types'

interface PageTitleProps extends InterfaceTextProps{
  text: string
}

export function PageTitle({
  text,
  ...rest
}: PageTitleProps){
  return (
    <Text color={'secondary.50'} fontFamily={'Inter_900Black'} fontSize={'24px'} {...rest}>{text}</Text>
  )
}
