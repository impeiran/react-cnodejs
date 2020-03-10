import styled from 'styled-components'

export const ellipse = ({
  component = null,
  width = 'auto',
  lineClamp = 1
}) => {
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