const EXPIRE_AFFIX = '_expire'

const helper = function (option = {}) {
  let {
    expire = 30 * 1000
  } = option

  this.LS = window.localStorage
  this.expire = expire
}

helper.prototype.check = function (key) {
  if (!this.LS.getItem(key + EXPIRE_AFFIX) || !this.LS.getItem(key)) return false

  const now = +new Date()
  const lastTime = this.LS.getItem(key + EXPIRE_AFFIX)
  if (now - lastTime > this.expire) {
    this.remove(key)
    return false
  }

  return true
}

helper.prototype.remove = function (key) {
  if (!key) return false

  this.LS.removeItem(key + EXPIRE_AFFIX)
  this.LS.removeItem(key)
  return true
}

helper.prototype.get = function (key) {
  if (!key || !this.check(key)) return
  
  return JSON.parse(this.LS.getItem(key)).data
}

helper.prototype.set = function (key, data) {
  if (!key) return false

  this.LS.setItem(key + EXPIRE_AFFIX, +new Date())
  this.LS.setItem(key, JSON.stringify({ data }))
  return true
}

helper.prototype.clear = function () {
  this.LS.clear()
  return true
}

export default helper