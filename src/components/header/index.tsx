import React from 'react'
import styled from 'styled-components'
import { BG_DARK } from '@/style/constants'

const HeaderLayout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width: 100%;
  height: 50px;
  padding: 10px;
  background: ${BG_DARK};
`

const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  transform: translate(-50%, -50%); 
`

const Header = props => {
  return (
    <HeaderLayout>
      <Logo src={ props.logo } />
    </HeaderLayout>
  )
}

export default React.memo(Header)