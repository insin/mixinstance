module.exports = instanceProtoMixin

var hasOwn = Object.prototype.hasOwnProperty
  , toString = Object.prototype.toString
  , slice = Array.prototype.slice

function isFunction(obj) {
  return toString.call(obj) == '[object Function]'
}

/**
 * An extend() which uses the prototype instead if you give it a Function.
 */
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

/**
 * Effectively mixes in any additional arguments into the given object's
 * original [[Prototype]], which ends up one step further down the prototype
 * chain on each call. Mixed in properties will take precedence.
 */
function instanceProtoMixin(obj) {
  var args = [Object.create(obj.__proto__)].concat(slice.call(arguments, 1))
  obj.__proto__ = mixin.apply(null, args)
}
