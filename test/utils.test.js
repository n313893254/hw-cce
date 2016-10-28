var should = require('should')
var sinon = require('sinon')
var Utils = require('../lib/utils.js')

describe('Utils', function () {
  describe('String::isString', function () {
    it('"str"|"" is String', () => {
      Utils.String.isString('str').should.be.true()
      Utils.String.isString('').should.be.true()
    })

    it('new String("str") is String', () => {
      Utils.String.isString(String()).should.be.true()
    })

    it('Object is not String', () => {
      Utils.String.isString(Object()).should.be.false()
      Utils.String.isString({}).should.be.false()
    })

    it('Array is not String', () => {
      Utils.String.isString(Array(1)).should.be.false()
      Utils.String.isString([]).should.be.false()
    })

    it('true|false is not String', () => {
      Utils.String.isString(false).should.be.false()
      Utils.String.isString(true).should.be.false()
    })
  })

  describe('String::substrBefore', function () {
    it('normal case', () => {
      Utils.String.substrBefore('abc.abc', '.').should.eql('abc')
    })
    it('not contains before char', () => {
      Utils.String.substrBefore('abcabc', '.').should.eql('abcabc')
    })
    it('source is null', () => {
      should.not.exist(Utils.String.substrBefore(null, '.'))
    })
    it('source is not str', () => {
      should.not.exist(Utils.String.substrBefore([], '.'))
    })
    it('contains multiply before char', () => {
      Utils.String.substrBefore('abc.abc.abc', '.').should.eql('abc')
    })
  })

  describe('String::removeEnd', function () {
    it('contains the end char', () => {
      Utils.String.removeEnd('abcdef', 'def').should.eql('abc')
    })

    it('contains multiply char', () => {
      Utils.String.removeEnd('defdef', 'def').should.eql('def')
    })

    it('not end with', () => {
      Utils.String.removeEnd('abcdef', 'cde').should.eql('abcdef')
    })
  })
  describe('JSON::sort', function () {
    it('with single key', () => {
      var obj = {'a': 'a'}
      Utils.JSON.sort(obj).should.eql(obj)
    })

    it('with multiply not ordered keys', () => {
      var obj = {'b': 'a', 'a': 'a'}
      Utils.JSON.sort(obj).should.containDeepOrdered({'a': 'a', 'b': 'a'})
    })

    it('with upper-case not ordered keys', () => {
      var obj = {'B': 'a', 'a': 'a'}
      Utils.JSON.sort(obj).should.containDeepOrdered({'a': 'a', 'B': 'a'})
    })

    it('return empty if null', () => {
      Utils.JSON.sort(null).should.eql({})
    })
  })

  describe('each', function () {
    it('each for array', () => {
      var array = ['a', 'b', 'c']
      Utils.each(array, function (ele, idx) {
        array[idx].should.eql(ele)
      })
    })

    it('each for object', () => {
      var object = {'a': '1', 'b': '2', 'c': '3'}
      Utils.each(object, function (value, key) {
        object[key].should.eql(value)
      })
    })
  })

  describe('map', function () {
    it('map for array', () => {
      var array = ['a', 'b', 'c']
      var mapped = Utils.map(array, function (ele, idx) {
        return 'M-' + ele
      })
      mapped.should.containDeepOrdered(['M-a', 'M-b', 'M-c'])
    })

    it('map for object', () => {
      var object = {'a': '1', 'b': '2', 'c': '3'}
      var mapped = Utils.map(object, function (value, key) {
        return key + '-' + value
      })
      mapped.should.containDeepOrdered(['a-1', 'b-2', 'c-3'])
    })
  })

  // describe('user-agent in browser', function () {
  //   Utils.getUserAgent().should.eql('fake-user-agent')
  // })
})
