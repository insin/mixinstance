module.exports = instanceProtoMixin

var hasOwn = Object.prototype.hasOwnProperty
  , toString = Object.prototype.toString

function isFunction(obj) {
  return toString.call(obj) == '[object Function]'
}

function mixin(dest) {
  for (var i = 1, l = arguments.length, src; i < l; i++) {
    src = arguments[i]
    if (!src) continue
    if (isFunction(src)) {
      src = src.prototype
    }
    for (var prop in src) {
      if (hasOwn.call(src, prop)) {
        dest[prop] = src[prop]
      }
    }
  }
  return dest
}

function instanceProtoMixin(obj, src) {
  obj.__proto__ = mixin(Object.create(obj.__proto__), src.prototype)
}
