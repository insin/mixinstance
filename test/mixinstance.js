var EventEmitter = require('events').EventEmitter

var test = require('tap').test

var mixinstance = require('../index')

function Herp() {}
Herp.prototype.herp = function() { return 'Herp' }

function Derp() {}
Derp.prototype.derp = function() { return 'Derp' }

test('mix multiple times', function(t) {
  t.plan(23)

  var preDerp = new Derp()
  var derp = new Derp()
  mixinstance(derp, Herp)
  var postDerp = new Derp()

  t.equal(typeof preDerp.herp, 'undefined', 'instance created before mixing does not have new properties')
  t.equal(typeof derp.herp, 'function', 'instance used for mixing has new properties')
  t.notOk(derp.hasOwnProperty('herp'), 'new properties are not own properties')
  t.equal(typeof postDerp.herp, 'undefined', 'instance created after mixing does not have new properties')

  t.ok(preDerp instanceof Derp, 'instance created before mixing is instanceof')
  t.ok(derp instanceof Derp, 'instance used for mixing is instanceof')
  t.ok(postDerp instanceof Derp, 'instance created after mixing is instanceof')

  t.ok(preDerp.constructor === Derp, 'instance created before mixing has .constructor')
  t.ok(derp.constructor === Derp, 'instance used for mixing has .constructor')
  t.ok(postDerp.constructor === Derp, 'instance created after mixing has .constructor')

  t.equal(derp.derp(), 'Derp')
  t.equal(derp.herp(), 'Herp')

  var EventEmitter = require('events').EventEmitter
  mixinstance(derp, EventEmitter)

  t.equal(typeof preDerp.on, 'undefined', 'instance created before mixing does not have new properties')
  t.equal(typeof derp.on, 'function', 'instance used for mixing has new properties')
  t.equal(typeof postDerp.on, 'undefined', 'instance created after mixing does not have new properties')

  t.ok(preDerp instanceof Derp, 'instance created before mixing is instanceof')
  t.ok(derp instanceof Derp, 'instance used for mixing is instanceof')
  t.ok(postDerp instanceof Derp, 'instance created after mixing is instanceof')

  t.ok(preDerp.constructor === Derp, 'instance created before mixing has .constructor')
  t.ok(derp.constructor === Derp, 'instance used for mixing has .constructor')
  t.ok(postDerp.constructor === Derp, 'instance created after mixing has .constructor')

  var herpa, derpa
  derp.on('derpa', function() {
    derpa = this.herp()
  })
  derp.on('herpa', function() {
    herpa = this.derp()
  })
  derp.emit('derpa')
  derp.emit('herpa')
  t.equal(herpa, 'Derp')
  t.equal(derpa, 'Herp')
})

test('mix multiple sources', function(t) {
  t.plan(4)

  var obj = {}
  mixinstance(obj, Herp, Derp, EventEmitter)
  t.equal(obj.herp(), 'Herp')
  t.equal(obj.derp(), 'Derp')
  var herpa, derpa
  obj.on('derpa', function() {
    derpa = this.herp()
  })
  obj.on('herpa', function() {
    herpa = this.derp()
  })
  obj.emit('derpa')
  obj.emit('herpa')
  t.equal(herpa, 'Derp')
  t.equal(derpa, 'Herp')
})
