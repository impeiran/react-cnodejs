import React, { useState } from 'react'
import ImageWrapper from './style'
import PropTypes from 'prop-types'

const Image = props => {
  const { src, alt, width, height, radius, style = {} } = props

  const [status, setStatus] = useState('loading')

  return (
    <ImageWrapper 
      className={`image-${status}`} 
      width={width} 
      height={height}
      radius={radius}
      style={{...style}}
    >
      <img     
        src={src}
        alt={alt}
        onLoad={() => setStatus('complete')}
        onError={() => setStatus('error')}
      />
    </ImageWrapper>
  )
}

Image.defaultProps = {
  alt: '',
  width: 50,
  height: 50,
  radius: 10
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
}

export default React.memo(Image)
