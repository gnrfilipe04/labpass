import React from 'react'

import { render } from '@testing-library/react-native'
import { NativeBaseProvider } from 'native-base'
import { theme } from '../../theme'
import { PageTitle } from '.'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
)

const inset = {
  frame: { x: 0, y: 0, width: 0, height: 0, },
  insets: { top: 0, left: 0, right: 0, bottom: 0, },
}


const Providers: React.FC = ({ children, }) => (
  <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
    {children}
  </NativeBaseProvider>
)


describe('Page Title Component', () => {

  it('should show text passed by properties', () => {

    const { getByTestId, } = render(<PageTitle text='Hello' testID='page-title'/>, { wrapper: Providers,})

    const pageTitleComponent = getByTestId('page-title')

    const result = pageTitleComponent.props.children
    const expected = 'Hello'

    expect(result).toEqual(expected)

  })
  
})
