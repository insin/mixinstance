var instanceProtoMixin = require('./instanceProtoMixin')

function Herp() {}
Herp.prototype.herp = function() { console.log('Herp') }

function Derp() {}
Derp.prototype.derp = function() { console.log('Derp') }

var preDerp = new Derp()
var derp = new Derp()
instanceProtoMixin(derp, Herp)
var postDerp = new Derp()

console.log('instanceof Derp?')
console.log('================')
console.log('preDerp:  ' + (preDerp instanceof Derp))
console.log('derp:     ' + (derp instanceof Derp))
console.log('postDerp: ' + (postDerp instanceof Derp))
console.log()

console.log('Has .herp?')
console.log('==========')
console.log('preDerp:  ' + typeof preDerp.herp)
console.log('derp:     ' + typeof derp.herp)
console.log('postDerp: ' + typeof postDerp.herp)
console.log()

console.log('Herp and Derp')
console.log('==============')
derp.derp()
derp.herp()
console.log()

var EventEmitter = require('events').EventEmitter
instanceProtoMixin(derp, EventEmitter)
derp.on('derpa', function() {
  derp.herp()
})
derp.on('herpa', function() {
  derp.derp()
})

console.log('Herpa and Derpa')
console.log('===============')
derp.emit('herpa')
derp.emit('derpa')
console.log()

var obj = {}
instanceProtoMixin(obj, Herp, Derp, EventEmitter)
obj.on('derpa', function() {
  derp.herp()
})
obj.on('herpa', function() {
  derp.derp()
})
console.log('All at once...')
console.log('==============')
obj.herp()
obj.derp()
obj.emit('herpa')
obj.emit('derpa')
