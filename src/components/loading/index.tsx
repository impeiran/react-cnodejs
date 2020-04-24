import React from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  margin: 10px auto;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: rgba(0, 0, 0, .3);
  animation: ${rotate} 1s linear infinite;
`

const TextWrapper = styled.div`
  margin-bottom: 10px;
  text-align: center;
`

const Loading = props => {
  return (
    <>
      <LoadingWrapper size={props.size || 30} />
      {
        props.text && <TextWrapper>{ props.text }</TextWrapper>
      }
    </>
    
  )
}

export default React.memo(Loading)
