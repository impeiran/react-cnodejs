const BODY = document.body || document.getElementsByTagName('body')[0]

const bodyStopScroll = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

class Utils {
  searchToQuery (sText) {
    if (sText.indexOf('?') === -1) return ''
    let result = {}
    sText.substring(sText.indexOf('?') + 1).split('&').forEach(item => {
      const keyValue = item.split('=')
      if (keyValue.length < 2) return
      result[keyValue[0]] = keyValue[1]
    })
    return result
  }

  lockScroll (flag) {
    if (flag) {
      BODY.style.overflow = 'hidden'
      document.addEventListener('touchmove', bodyStopScroll, { passive: false })
    } else {
      BODY.style.overflow = 'visible'
      document.removeEventListener('touchmove', bodyStopScroll, { passive: false })
    }
  }
}

export default new Utils()