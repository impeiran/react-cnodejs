import React from 'react'
import styled from 'styled-components'

interface Option {
  component: React.FC;
  width?: string;
  lineClamp?: number;
}

export const ellipse = ({
  component,
  width = 'auto',
  lineClamp = 1
}: Option) => {
  let strTpl = `
    overflow: hidden;
    text-overflow: ellipsis;
    width: ${width};
  `
  if (lineClamp > 1) {
    strTpl += `
      display: -webkit-box !important;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
    `
  } else {
    strTpl += `
      white-space: nowrap;
    `
  }
 
  return styled(component) `
    ${ strTpl }
  `
}