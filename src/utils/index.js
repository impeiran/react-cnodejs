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
}

export default new Utils()