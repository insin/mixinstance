===========================
mixinstance |travis_status|
===========================

.. |travis_status| image:: https://secure.travis-ci.org/insin/mixinstance.png
   :target: http://travis-ci.org/insin/mixinstance

Mixes new properties into an instance's prototype chain.

Example
=======

::

   function Player() {}
   Player.prototype.play = function() { console.log('Play') }

   function Goro() {}
   Goro.prototype.fireball = function() { console.log('Fireball') }
   Goro.prototype.stomp = function() { console.log('Stomp') }
   Goro.prototype.grab = function() { console.log('Grab') }

   var player1 = new Player()

Whoops, we already have an instance but now, as many have asked since the dawn
of time, how can I 'be' Goro?

   var mixinstance = require('mixinstance')

   mixinstance(player1, Goro)
   player1.play()
   player1.fireball()
   player1.stomp()

MIT License
===========

Copyright (c) 2012, Jonathan Buchanan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.