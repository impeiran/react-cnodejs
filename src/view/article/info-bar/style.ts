import styled from "styled-components";

const InfoBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  color: #aaa;
  font-size: 12px;

  ul {
    display: flex;
    align-items: center;
    margin: 0 8px;
    font-size: 12px;

    li:not(:last-child) {
      margin-right: 8px;
    }
  }
`

export default InfoBarWrapper