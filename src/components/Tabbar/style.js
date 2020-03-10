import styled from 'styled-components'
import { BG_DARK, COLOR_THEME } from '@/style/constants'

const TabbarWrapper = styled.ul`
  display: flex;
  width: 100%;
  background-color: ${BG_DARK};
  overflow: auto;

  a {
    display: inline-block;
    flex: 1;
    text-align: center;
    color: hsla(0,0%,100%,.7);
    transition: all .3s;
    &.active {
      color: #fff;
      font-weight: bold;
      
      li {
        width: 100%;
        border-bottom: ${`4px solid ${COLOR_THEME}`}
      }
    }
  }
`

export const TabbarItem = styled.li`
  display: inline-block;
  padding: 12px 16px;
  /* box-sizing: content-box; */
  font-size: 14px;
  /* transition: border-bottom-color .3s; */
`

export default TabbarWrapper