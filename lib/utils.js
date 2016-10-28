'use strict'

var os = require('os')
var crypto = require('crypto')

/**
 * common utils
 * @private
 */
module.exports = {

  getUserAgent: function () {
    /* istanbul ignore if */
    if (this.isBrowser() && typeof navigator !== 'undefined') {
      return navigator.userAgent
    } else if (this.isNode()) {
      return this.getClientEnv()
    }
  },

  /**
   * get client env string
   * @method   getClientEnv
   * @return   client env description(sdk-version,platform,arch,etc)
   */
  getClientEnv: function () {
    var name = this.isBrowser() ? 'js' : 'nodejs'
    var useragent = 'hw-sdk-' + name + '-' + require('../package.json').version +
      ' (' + os.platform() + ' ' + os.release() + ' ' + os.arch() + ';' + process.version + ')'
    return useragent
  },

  isBrowser: function () { return typeof window !== 'undefined' },
  isNode: function () { return !this.isBrowser() },

  /** copied from underscore source below */

  MAX_ARRAY_INDEX: Math.pow(2, 53) - 1,

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  isArrayLike: function (collection) {
    var length = collection != null && collection.length
    return typeof length === 'number' && length >= 0 && length <= this.MAX_ARRAY_INDEX
  },

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  each: function (obj, iteratee, context) {
    var i, length
    if (this.isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee.call(context, obj[i], i, obj)
      }
    } else {
      var keys = Object.keys(obj)
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee.call(context, obj[keys[i]], keys[i], obj)
      }
    }
    return obj
  },

  // Return the results of applying the iteratee to each element.
  map: function (obj, iteratee, context) {
    var keys = !this.isArrayLike(obj) && Object.keys(obj)
    var length = (keys || obj).length
    var results = Array(length)
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index
      results[index] = iteratee.call(context, obj[currentKey], currentKey, obj)
    }
    return results
  },

  /** copied from underscore source upon */

  Crypto: {
    hmac: function hmac (key, string, digest, fn) {
      /* istanbul ignore if */
      if (!digest) digest = 'binary'
      /* istanbul ignore if */
      if (digest === 'buffer') { digest = undefined }
      if (!fn) fn = 'sha256'
      if (typeof string === 'string') string = new Buffer(string)
      return crypto.createHmac(fn, key).update(string).digest(digest)
    }
  },
  /**
   * sha256 digest
   * @method   sha256
   * @param   {String} string
   * @param   {String} digest  digest type -> 'hex', 'base64'
   * @return   source without end char
   */
  sha256: function sha256 (string, digest) {
    /* istanbul ignore if */
    if (!digest) { digest = 'binary' }
    /* istanbul ignore if */
    if (digest === 'buffer') { digest = undefined }
    if (typeof string === 'string') string = new Buffer(string)
    return crypto.createHash('sha256').update(string).digest(digest)
  },

  String: {

    /**
     * check whether an object is String
     * @method isString
     * @param {any} obj
     * @return {boolean} whether obj is String
     */
    isString: function (obj) {
      return (Object.prototype.toString.call(obj) === '[object String]')
    },

    /**
     * delete end char if exists
     * @method   substrBefore
     * @param {String} source target string
     * @param {String} before char
     * @return the segment before char {before}
     */
    substrBefore: function (source, before) {
      if (this.isString(source)) {
        var idx = source.indexOf(before)
        return source.slice(0, idx > -1 ? idx : source.length)
      }
      return null
    },

    /**
     * delete end char if exists
     * @method removeEnd
     * @param {String} source target string
     * @param {String} the string to be removed
     * @return   source without end char
     */
    removeEnd: function (source, endwith) {
      return source.endsWith(endwith) ? source.slice(0, -endwith.length) : source
    }
  },

  Date: {

    /**
     * @return [String] the date in ISO-8601 format
     */
    iso8601: function (date) {
      return date.toISOString().replace(/\.\d{3}Z$/, 'Z')
    },

    /**
     * format as YYYYMMDD'T'HHMMSS'Z'
     * @return [String] the date in SDK format
     */
    sdkdate: function (date) {
      return this.iso8601(date).replace(/-/g, '').replace(/:/g, '')
    }
  },

  JSON: {
    sort: function (json) {
      var sorted = {}
      Object.keys(json || {}).sort().forEach(function (key) {
        sorted[key] = json[key]
      })
      return sorted
    }
  }

}

