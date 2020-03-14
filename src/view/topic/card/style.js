import styled from 'styled-components'

const CardWrapper = styled.div`
  margin-bottom: 10px;
  padding-bottom: 10px;
  color: #333;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
`

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  h4 {
    margin-left: 10px;
    flex: 1;
    line-height: 1.4;
    font-size: 14px;
  }
`

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  color: #888;
`

export const Info = styled.div`
  display: flex;
  flex: 1;

  ul {
    margin-left: 10px;
    flex: 1;

    li {
      margin: 6px 0;
      color: #555;
    }
  }
`

export const Time = styled.div`
  padding-top: 30px;
`

export default CardWrapper
