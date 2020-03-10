import styled from 'styled-components'

const Layout = styled.div`
  min-height: 100vh;
  padding-top: 92px;
`

export const Fixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  overflow: hidden;
`

export default Layout