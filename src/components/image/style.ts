import styled from 'styled-components'

const ImageWrapper = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  overflow: hidden;
  border-radius: ${props => typeof props.radius === 'number' ? props.radius + 'px' : props.radius};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: opacity .5s;
  }

  &.image-loading, &.image-error {
    background: #ddd;

    img {
      opacity: 0;
    }
  }

  &.image-error:before {
    display: flex;
    align-items: center;
    justify-content: center;
    content: '!';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 40%;
    text-align: center;
    color: #aaa;
    font-weight: bold;
    border: 1px solid #aaa;
    border-radius: 50%;
  }
`

export default ImageWrapper
