/* Copyright (c) 2013 Richard Rodger */
'use strict';

var Lab = require('lab');
var Code = require('code');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;
var tagx = require('..')

function s(t) {
  return t.toString();
}

describe('tagx', function () {

  it('happy', function (done) {
    expect(s(tagx('red, green, blue'))).to.equal(s(['red', 'green', 'blue']))
    done()
  })


  describe('split', function () {

    it('empty', function (done) {
      var empty = s([])
      expect(s(tagx())).to.equal(empty)
      expect(s(tagx(''))).to.equal(empty)
      done()
    })

    it('single char array', function (done) {
      [
        tagx('a'),
        tagx('a'),
        tagx(' a'),
        tagx('a '),
        tagx(' a '),
        tagx(',a'),
        tagx('a,'),
        tagx(',a,'),
        tagx(', a'),
        tagx('a ,'),
        tagx(', a ,'),
        tagx(' ,a'),
        tagx('a, '),
        tagx(' ,a, ')].forEach(function (it) {
        expect(s(it)).to.equal(s(['a']));
      })

      done()
    })


    it('two char array', function (done) {
      [tagx('aa'),
        tagx('aa'),
        tagx(' aa'),
        tagx('aa '),
        tagx(' aa '),
        tagx(',aa'),
        tagx('aa,'),
        tagx(',aa,'),
        tagx(', aa'),
        tagx('aa ,'),
        tagx(', aa ,'),
        tagx(' ,aa'),
        tagx('aa, '),
        tagx(' ,aa, ')].forEach(function (it) {
        expect(s(it)).to.equal(s(['aa']));
      })

      done()
    })

    it('two elem array', function (done) {
      [
        tagx('a,b'),
        tagx('a b'),
        tagx('a,b,'),
        tagx('a b '),
        tagx(',a,b,'),
        tagx(' a b ')].forEach(function (it) {
        expect(s(it)).to.equal(s(['a', 'b']));
      })

      done()
    })


    it('three elem array', function (done) {
      [
        tagx('a,b,c'),
        tagx('a b c')].forEach(function (it) {
        expect(s(it)).to.equal(s(['a', 'b', 'c']));
      })

      done()
    })

  })


  it('append', function (done) {
    expect(s(tagx('a', 'b'))).to.equal(s(['a', 'b']))
    expect(s(tagx('a b', ''))).to.equal(s(['a', 'b']))
    expect(s(tagx('a b', 'c'))).to.equal(s(['a', 'b', 'c']))
    expect(s(tagx('a b', 'c d'))).to.equal(s(['a', 'b', 'c', 'd']))
    done()
  })


  it('remove', function (done) {
    expect(s(tagx('a !b'))).to.equal(s(['a']))
    expect(s(tagx('!b a'))).to.equal(s(['a']))

    expect(s(tagx('a b !b'))).to.equal(s(['a']))
    expect(s(tagx('a b', '!b'))).to.equal(s(['a']))
    expect(s(tagx('a b c', '!b !c'))).to.equal(s(['a']))
    expect(s(tagx('a b', 'c', '!c'))).to.equal(s(['a', 'b']))
    expect(s(tagx('a b', 'c d', '!d !c'))).to.equal(s(['a', 'b']))

    expect(s(tagx('a !b b'))).to.equal(s(['a']))
    expect(s(tagx('a !b', 'b'))).to.equal(s(['a']))
    expect(s(tagx('a !b !c', 'b c'))).to.equal(s(['a']))
    expect(s(tagx('a b', '!c', 'c'))).to.equal(s(['a', 'b']))
    expect(s(tagx('a b', '!c !d', 'd c'))).to.equal(s(['a', 'b']))
    done()
  })


  it('fixed', function (done) {
    var t0 = tagx({})
    expect(s(t0('a'))).to.equal(s(['a']))
    expect(s(t0('a', 'b'))).to.equal(s(['a', 'b']))
    expect(s(t0('a b'))).to.equal(s(['a', 'b']))

    var t1 = tagx({}, '')
    expect(s(t1('a'))).to.equal(s(['a']))
    expect(s(t1('a', 'b'))).to.equal(s(['a', 'b']))
    expect(s(t1('a b'))).to.equal(s(['a', 'b']))

    var t2 = tagx({}, 'x')
    expect(s(t2('a'))).to.equal(s(['x', 'a']))
    expect(s(t2('a', 'b'))).to.equal(s(['x', 'a', 'b']))
    expect(s(t2('a b'))).to.equal(s(['x', 'a', 'b']))

    var t3 = tagx({}, 'x', 'y')
    expect(s(t3('a'))).to.equal(s(['x', 'y', 'a']))
    expect(s(t3('a', 'b'))).to.equal(s(['x', 'y', 'a', 'b']))
    expect(s(t3('a b'))).to.equal(s(['x', 'y', 'a', 'b']))

    var t4 = tagx({}, 'x y')
    expect(s(t4('a'))).to.equal(s(['x', 'y', 'a']))
    expect(s(t4('a', 'b'))).to.equal(s(['x', 'y', 'a', 'b']))
    expect(s(t4('a b'))).to.equal(s(['x', 'y', 'a', 'b']))
    done()
  })


  it('expand', function (done) {
    var t1 = tagx({expand: {u: 'x'}})
    expect(s(t1('a'))).to.equal(s(['a']))
    expect(s(t1('u'))).to.equal(s(['x']))
    expect(s(t1('a u'))).to.equal(s(['a', 'x']))
    expect(s(t1('u a'))).to.equal(s(['x', 'a']))
    expect(s(t1('a', 'u', 'b'))).to.equal(s(['a', 'x', 'b']))
    expect(s(t1('a u b'))).to.equal(s(['a', 'x', 'b']))

    var t2 = tagx({expand: {u: 'x y'}})
    expect(s(t2('a'))).to.equal(s(['a']))
    expect(s(t2('u'))).to.equal(s(['x', 'y']))
    expect(s(t2('a u'))).to.equal(s(['a', 'x', 'y']))
    expect(s(t2('u a'))).to.equal(s(['x', 'y', 'a']))
    expect(s(t2('a', 'u', 'b'))).to.equal(s(['a', 'x', 'y', 'b']))
    expect(s(t2('a u b'))).to.equal(s(['a', 'x', 'y', 'b']))

    var t3 = tagx({expand: {u: 'x y', v: 'z'}})
    expect(s(t3('a'))).to.equal(s(['a']))
    expect(s(t3('u v'))).to.equal(s(['x', 'y', 'z']))
    expect(s(t3('a u v'))).to.equal(s(['a', 'x', 'y', 'z']))
    expect(s(t3('u a v'))).to.equal(s(['x', 'y', 'a', 'z']))
    expect(s(t3('a', 'u', 'v', 'b'))).to.equal(s(['a', 'x', 'y', 'z', 'b']))
    expect(s(t3('a u v b'))).to.equal(s(['a', 'x', 'y', 'z', 'b']))
    done()
  })


  it('expand-remove', function (done) {
    var t1 = tagx({expand: {u: 'x !y'}})
    expect(s(t1('a u'))).to.equal(s(['a', 'x']))
    expect(s(t1('a y u'))).to.equal(s(['a', 'x']))
    expect(s(t1('a !x u'))).to.equal(s(['a']))
    done()
  })


  it('expand-depth', function (done) {
    var t1 = tagx({expand: {u: 'v', v: 'w'}})
    expect(s(t1('a u'))).to.equal(s(['a', 'w']))

    // cycles
    var t2 = tagx({expand: {u: 'v', v: 'u'}})
    expect(s(t2('a u'))).to.equal(s(['a', 'u']))
    done()
  })


  it('case', function (done) {
    var t1 = tagx({case: false})
    expect(s(t1('a A Bb'))).to.equal(s(['a', 'bb']))
    done()
  })

})
