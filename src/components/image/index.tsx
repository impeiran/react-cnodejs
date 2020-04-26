import React, { useState } from 'react'
import ImageWrapper from './style'

const defaultProps = {
  alt: '',
  width: 50,
  height: 50,
  radius: 8,
  onClick: (e: React.MouseEvent) => {}
}

export interface ImageProps extends Partial<typeof defaultProps>{
  src: string;
  style?: React.CSSProperties
}

const Image: React.FC<ImageProps> = (props: ImageProps) => {
  const { src, alt, width, height, radius, style = {}, onClick } = props

  const [status, setStatus] = useState('loading')

  return (
    <ImageWrapper 
      className={`image-${status}`} 
      width={width} 
      height={height}
      radius={radius}
      style={{...style}}
      onClick={onClick}
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

Image.defaultProps = defaultProps

export default React.memo(Image)
