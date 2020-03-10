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
  }

  &.image-loading, &.image-error {
    background: #ddd;

    img { display: none; }
  }
`

export default ImageWrapper
