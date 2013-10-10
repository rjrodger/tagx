/* Copyright (c) 2013 Richard Rodger */
"use strict";


if( typeof tagx === 'undefined' ) {
  var tagx = require('..')
}




describe('tagx', function() {
  
  it('happy', function() {
    expect( ''+['red','green','blue'] ).toBe( ''+tagx('red, green, blue') )
  })


  it('split', function() {
    
    expect( ''+[] ).toBe( ''+tagx() )
    expect( ''+[] ).toBe( ''+tagx('') )

    expect( ''+['a'] ).toBe( ''+tagx('a') )
    expect( ''+['a'] ).toBe( ''+tagx('a') )
    expect( ''+['a'] ).toBe( ''+tagx(' a') )
    expect( ''+['a'] ).toBe( ''+tagx('a ') )
    expect( ''+['a'] ).toBe( ''+tagx(' a ') )
    expect( ''+['a'] ).toBe( ''+tagx(',a') )
    expect( ''+['a'] ).toBe( ''+tagx('a,') )
    expect( ''+['a'] ).toBe( ''+tagx(',a,') )
    expect( ''+['a'] ).toBe( ''+tagx(', a') )
    expect( ''+['a'] ).toBe( ''+tagx('a ,') )
    expect( ''+['a'] ).toBe( ''+tagx(', a ,') )
    expect( ''+['a'] ).toBe( ''+tagx(' ,a') )
    expect( ''+['a'] ).toBe( ''+tagx('a, ') )
    expect( ''+['a'] ).toBe( ''+tagx(' ,a, ') )

    expect( ''+['aa'] ).toBe( ''+tagx('aa') )
    expect( ''+['aa'] ).toBe( ''+tagx('aa') )
    expect( ''+['aa'] ).toBe( ''+tagx(' aa') )
    expect( ''+['aa'] ).toBe( ''+tagx('aa ') )
    expect( ''+['aa'] ).toBe( ''+tagx(' aa ') )
    expect( ''+['aa'] ).toBe( ''+tagx(',aa') )
    expect( ''+['aa'] ).toBe( ''+tagx('aa,') )
    expect( ''+['aa'] ).toBe( ''+tagx(',aa,') )
    expect( ''+['aa'] ).toBe( ''+tagx(', aa') )
    expect( ''+['aa'] ).toBe( ''+tagx('aa ,') )
    expect( ''+['aa'] ).toBe( ''+tagx(', aa ,') )
    expect( ''+['aa'] ).toBe( ''+tagx(' ,aa') )
    expect( ''+['aa'] ).toBe( ''+tagx('aa, ') )
    expect( ''+['aa'] ).toBe( ''+tagx(' ,aa, ') )

    expect( ''+['a','b'] ).toBe( ''+tagx('a,b') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a,b,') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b ') )
    expect( ''+['a','b'] ).toBe( ''+tagx(',a,b,') )
    expect( ''+['a','b'] ).toBe( ''+tagx(' a b ') )

    expect( ''+['a','b','c'] ).toBe( ''+tagx('a,b,c') )
    expect( ''+['a','b','c'] ).toBe( ''+tagx('a b c') )

  })


  it('append', function(){
    expect( ''+['a','b'] ).toBe( ''+tagx('a','b') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b','') )
    expect( ''+['a','b','c'] ).toBe( ''+tagx('a b','c') )
    expect( ''+['a','b','c','d'] ).toBe( ''+tagx('a b','c d') )
  })


  it('remove', function(){
    expect( ''+['a'] ).toBe( ''+tagx('a !b') )
    expect( ''+['a'] ).toBe( ''+tagx('!b a') )

    expect( ''+['a'] ).toBe( ''+tagx('a b !b') )
    expect( ''+['a'] ).toBe( ''+tagx('a b','!b') )
    expect( ''+['a'] ).toBe( ''+tagx('a b c','!b !c') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b','c','!c') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b','c d','!d !c') )

    expect( ''+['a'] ).toBe( ''+tagx('a !b b') )
    expect( ''+['a'] ).toBe( ''+tagx('a !b','b') )
    expect( ''+['a'] ).toBe( ''+tagx('a !b !c','b c') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b','!c','c') )
    expect( ''+['a','b'] ).toBe( ''+tagx('a b','!c !d','d c') )
  })


  it('fixed', function(){
    var t0 = tagx({})
    expect( ''+['a'] ).toBe( ''+t0('a') )
    expect( ''+['a','b'] ).toBe( ''+t0('a','b') )
    expect( ''+['a','b'] ).toBe( ''+t0('a b') )

    var t1 = tagx({},'')
    expect( ''+['a'] ).toBe( ''+t1('a') )
    expect( ''+['a','b'] ).toBe( ''+t1('a','b') )
    expect( ''+['a','b'] ).toBe( ''+t1('a b') )

    var t2 = tagx({},'x')
    expect( ''+['x','a'] ).toBe( ''+t2('a') )
    expect( ''+['x','a','b'] ).toBe( ''+t2('a','b') )
    expect( ''+['x','a','b'] ).toBe( ''+t2('a b') )

    var t3 = tagx({},'x','y')
    expect( ''+['x','y','a'] ).toBe( ''+t3('a') )
    expect( ''+['x','y','a','b'] ).toBe( ''+t3('a','b') )
    expect( ''+['x','y','a','b'] ).toBe( ''+t3('a b') )

    var t4 = tagx({},'x y')
    expect( ''+['x','y','a'] ).toBe( ''+t4('a') )
    expect( ''+['x','y','a','b'] ).toBe( ''+t4('a','b') )
    expect( ''+['x','y','a','b'] ).toBe( ''+t4('a b') )
  })


  it('expand', function(){
    var t1 = tagx({expand:{u:'x'}})
    expect( ''+['a'] ).toBe( ''+t1('a') )
    expect( ''+['x'] ).toBe( ''+t1('u') )
    expect( ''+['a','x'] ).toBe( ''+t1('a u') )
    expect( ''+['x','a'] ).toBe( ''+t1('u a') )
    expect( ''+['a','x','b'] ).toBe( ''+t1('a','u','b') )
    expect( ''+['a','x','b'] ).toBe( ''+t1('a u b') )

    var t2 = tagx({expand:{u:'x y'}})
    expect( ''+['a'] ).toBe( ''+t2('a') )
    expect( ''+['x','y'] ).toBe( ''+t2('u') )
    expect( ''+['a','x','y'] ).toBe( ''+t2('a u') )
    expect( ''+['x','y','a'] ).toBe( ''+t2('u a') )
    expect( ''+['a','x','y','b'] ).toBe( ''+t2('a','u','b') )
    expect( ''+['a','x','y','b'] ).toBe( ''+t2('a u b') )

    var t3 = tagx({expand:{u:'x y',v:'z'}})
    expect( ''+['a'] ).toBe( ''+t3('a') )
    expect( ''+['x','y','z'] ).toBe( ''+t3('u v') )
    expect( ''+['a','x','y','z'] ).toBe( ''+t3('a u v') )
    expect( ''+['x','y','a','z'] ).toBe( ''+t3('u a v') )
    expect( ''+['a','x','y','z','b'] ).toBe( ''+t3('a','u','v','b') )
    expect( ''+['a','x','y','z','b'] ).toBe( ''+t3('a u v b') )
  })


  it('expand-remove', function(){
    var t1 = tagx({expand:{u:'x !y'}})
    expect( ''+['a','x'] ).toBe( ''+t1('a u') )
    expect( ''+['a','x'] ).toBe( ''+t1('a y u') )
    expect( ''+['a'] ).toBe( ''+t1('a !x u') )
  })


  it('expand-depth', function(){
    var t1 = tagx({expand:{u:'v',v:'w'}})
    expect( ''+['a','w'] ).toBe( ''+t1('a u') )

    // cycles
    var t2 = tagx({expand:{u:'v',v:'u'}})
    expect( ''+['a','u'] ).toBe( ''+t2('a u') )
  })


  it('case', function(){
    var t1 = tagx({case:false})
    expect( ''+['a','bb'] ).toBe( ''+t1('a A Bb') )
  })

})
