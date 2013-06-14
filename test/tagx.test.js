/* Copyright (c) 2013 Richard Rodger */
"use strict";


// mocha tagx.test.js

var assert = require('assert')


var tagx = require('..')


describe('tagx', function() {
  
  it('happy', function() {
    assert.equal( ''+['red','green','blue'], ''+tagx('red, green, blue') )
  })


  it('split', function() {
    
    assert.equal( ''+[], ''+tagx() )
    assert.equal( ''+[], ''+tagx('') )

    assert.equal( ''+['a'], ''+tagx('a') )
    assert.equal( ''+['a'], ''+tagx('a') )
    assert.equal( ''+['a'], ''+tagx(' a') )
    assert.equal( ''+['a'], ''+tagx('a ') )
    assert.equal( ''+['a'], ''+tagx(' a ') )
    assert.equal( ''+['a'], ''+tagx(',a') )
    assert.equal( ''+['a'], ''+tagx('a,') )
    assert.equal( ''+['a'], ''+tagx(',a,') )
    assert.equal( ''+['a'], ''+tagx(', a') )
    assert.equal( ''+['a'], ''+tagx('a ,') )
    assert.equal( ''+['a'], ''+tagx(', a ,') )
    assert.equal( ''+['a'], ''+tagx(' ,a') )
    assert.equal( ''+['a'], ''+tagx('a, ') )
    assert.equal( ''+['a'], ''+tagx(' ,a, ') )

    assert.equal( ''+['aa'], ''+tagx('aa') )
    assert.equal( ''+['aa'], ''+tagx('aa') )
    assert.equal( ''+['aa'], ''+tagx(' aa') )
    assert.equal( ''+['aa'], ''+tagx('aa ') )
    assert.equal( ''+['aa'], ''+tagx(' aa ') )
    assert.equal( ''+['aa'], ''+tagx(',aa') )
    assert.equal( ''+['aa'], ''+tagx('aa,') )
    assert.equal( ''+['aa'], ''+tagx(',aa,') )
    assert.equal( ''+['aa'], ''+tagx(', aa') )
    assert.equal( ''+['aa'], ''+tagx('aa ,') )
    assert.equal( ''+['aa'], ''+tagx(', aa ,') )
    assert.equal( ''+['aa'], ''+tagx(' ,aa') )
    assert.equal( ''+['aa'], ''+tagx('aa, ') )
    assert.equal( ''+['aa'], ''+tagx(' ,aa, ') )

    assert.equal( ''+['a','b'], ''+tagx('a,b') )
    assert.equal( ''+['a','b'], ''+tagx('a b') )
    assert.equal( ''+['a','b'], ''+tagx('a,b,') )
    assert.equal( ''+['a','b'], ''+tagx('a b ') )
    assert.equal( ''+['a','b'], ''+tagx(',a,b,') )
    assert.equal( ''+['a','b'], ''+tagx(' a b ') )

    assert.equal( ''+['a','b','c'], ''+tagx('a,b,c') )
    assert.equal( ''+['a','b','c'], ''+tagx('a b c') )

  })


  it('append', function(){
    assert.equal( ''+['a','b'], ''+tagx('a','b') )
    assert.equal( ''+['a','b'], ''+tagx('a b','') )
    assert.equal( ''+['a','b','c'], ''+tagx('a b','c') )
    assert.equal( ''+['a','b','c','d'], ''+tagx('a b','c d') )
  })


  it('remove', function(){
    assert.equal( ''+['a'], ''+tagx('a !b') )
    assert.equal( ''+['a'], ''+tagx('!b a') )

    assert.equal( ''+['a'], ''+tagx('a b !b') )
    assert.equal( ''+['a'], ''+tagx('a b','!b') )
    assert.equal( ''+['a'], ''+tagx('a b c','!b !c') )
    assert.equal( ''+['a','b'], ''+tagx('a b','c','!c') )
    assert.equal( ''+['a','b'], ''+tagx('a b','c d','!d !c') )

    assert.equal( ''+['a'], ''+tagx('a !b b') )
    assert.equal( ''+['a'], ''+tagx('a !b','b') )
    assert.equal( ''+['a'], ''+tagx('a !b !c','b c') )
    assert.equal( ''+['a','b'], ''+tagx('a b','!c','c') )
    assert.equal( ''+['a','b'], ''+tagx('a b','!c !d','d c') )
  })


  it('fixed', function(){
    var t0 = tagx({})
    assert.equal( ''+['a'], ''+t0('a') )
    assert.equal( ''+['a','b'], ''+t0('a','b') )
    assert.equal( ''+['a','b'], ''+t0('a b') )

    var t1 = tagx({},'')
    assert.equal( ''+['a'], ''+t1('a') )
    assert.equal( ''+['a','b'], ''+t1('a','b') )
    assert.equal( ''+['a','b'], ''+t1('a b') )

    var t2 = tagx({},'x')
    assert.equal( ''+['x','a'], ''+t2('a') )
    assert.equal( ''+['x','a','b'], ''+t2('a','b') )
    assert.equal( ''+['x','a','b'], ''+t2('a b') )

    var t3 = tagx({},'x','y')
    assert.equal( ''+['x','y','a'], ''+t3('a') )
    assert.equal( ''+['x','y','a','b'], ''+t3('a','b') )
    assert.equal( ''+['x','y','a','b'], ''+t3('a b') )

    var t4 = tagx({},'x y')
    assert.equal( ''+['x','y','a'], ''+t4('a') )
    assert.equal( ''+['x','y','a','b'], ''+t4('a','b') )
    assert.equal( ''+['x','y','a','b'], ''+t4('a b') )
  })


  it('expand', function(){
    var t1 = tagx({expand:{u:'x'}})
    assert.equal( ''+['a'], ''+t1('a') )
    assert.equal( ''+['x'], ''+t1('u') )
    assert.equal( ''+['a','x'], ''+t1('a u') )
    assert.equal( ''+['x','a'], ''+t1('u a') )
    assert.equal( ''+['a','x','b'], ''+t1('a','u','b') )
    assert.equal( ''+['a','x','b'], ''+t1('a u b') )

    var t2 = tagx({expand:{u:'x y'}})
    assert.equal( ''+['a'], ''+t2('a') )
    assert.equal( ''+['x','y'], ''+t2('u') )
    assert.equal( ''+['a','x','y'], ''+t2('a u') )
    assert.equal( ''+['x','y','a'], ''+t2('u a') )
    assert.equal( ''+['a','x','y','b'], ''+t2('a','u','b') )
    assert.equal( ''+['a','x','y','b'], ''+t2('a u b') )

    var t3 = tagx({expand:{u:'x y',v:'z'}})
    assert.equal( ''+['a'], ''+t3('a') )
    assert.equal( ''+['x','y','z'], ''+t3('u v') )
    assert.equal( ''+['a','x','y','z'], ''+t3('a u v') )
    assert.equal( ''+['x','y','a','z'], ''+t3('u a v') )
    assert.equal( ''+['a','x','y','z','b'], ''+t3('a','u','v','b') )
    assert.equal( ''+['a','x','y','z','b'], ''+t3('a u v b') )
  })


  it('expand-remove', function(){
    var t1 = tagx({expand:{u:'x !y'}})
    assert.equal( ''+['a','x'], ''+t1('a u') )
    assert.equal( ''+['a','x'], ''+t1('a y u') )
    assert.equal( ''+['a'], ''+t1('a !x u') )
  })


  it('expand-depth', function(){
    var t1 = tagx({expand:{u:'v',v:'w'}})
    assert.equal( ''+['a','w'], ''+t1('a u') )

    // cycles
    var t2 = tagx({expand:{u:'v',v:'u'}})
    assert.equal( ''+['a','u'], ''+t2('a u') )
  })


  it('case', function(){
    var t1 = tagx({case:false})
    assert.equal( ''+['a','bb'], ''+t1('a A Bb') )
  })

})
