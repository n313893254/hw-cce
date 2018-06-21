'use strict'

var Utils = require('../utils.js')
var Constants = require('./constants.js')
var Url = require('url')
var QS = require('querystring')

class V4 {

  /**
   * @public
   * @getter
   * @method algorithm
   * @return this signer's algorithm name
   */
  get algorithm () {
    return 'SDK-HMAC-SHA256'
  }

  /**
   * headers should be signed if present
   * @public
   * @getter
   * @method signedHeaders
   * @return the headers need to sign
   */
  get signedHeaders () {
    // return [ Constants.CONTENT_TYPE, Constants.HOST, Constants.X_SDK_DATE ].sort()
    return [ Constants.CONTENT_LENGTH, Constants.CONTENT_TYPE, Constants.HOST, Constants.X_SDK_DATE ].sort()
  }

  /**
   * initial signer required data
   * @constructor
   * @return
   */
  constructor (options) {
    Object.assign(this, options)
  }

  /**
   * get headers with lowercase header name,
   * superagent request has provider private field _header,
   * just in case it changeds
   *
   * @method getHeaders
   * @param {Object} super-agent request object
   * @return {Array}
   */
  getRequestHeaders (request) {
    console.log(this.host)
    // var headers = {'host': this.host}
    // var headers ={}
    var headers = {'host': 'vpc.cn-north-1.myhuaweicloud.com'}
    for (var header in request.header) {
      headers[header.toLowerCase().trim()] = request.header[header]
    }
    return headers
  }

  /**
   * get headers which should be signed
   *
   * @method getToSignedHeaderNames
   * @param {Object} superagent request object
   * @return {String} header-names delimited with ";" and in alpha order
   */
  getHeaderNamesToSign (headers) {
    var toSignedHeaderNames = []
    Utils.each(this.signedHeaders, function (header, idx) {
      var lcHeader = header.toLowerCase()
      if (headers[lcHeader]) {
        toSignedHeaderNames.push(lcHeader)
      }
    })
    return toSignedHeaderNames.join(';')
  }

  /**
   * get canonical headers which should be signed
   *
   * @method getToSignedHeaderNames
   * @param {Object} superagent request object
   * @return {String} header-name+':'+header-value delimited with "\n"
   */
  buildCanonicalHeaders (headers) {
    var canonicalHeaders = []
    Utils.each(this.signedHeaders, function (header, idx) {
      var lcHeader = header.toLowerCase()
      if (headers[lcHeader]) {
        if (lcHeader === 'host') {
          canonicalHeaders.push(lcHeader + ':' + 'vpc.cn-north-1.myhuaweicloud.com')
        } else {
          canonicalHeaders.push(lcHeader + ':' + headers[lcHeader])
        }
      }
    })
    console.log(canonicalHeaders)
    return canonicalHeaders.join(Constants.LINE_SEPARATOR) + Constants.LINE_SEPARATOR
  }

  buildCanonicalRequest (method, canonicalURI, canonicalQueryString, canonicalHeaders, toSignedHeaderNames, payloadHash) {
    var segments = []
    segments.push(method)
    segments.push(canonicalURI)
    segments.push(canonicalQueryString)
    segments.push(canonicalHeaders)
    segments.push(toSignedHeaderNames)
    segments.push(payloadHash)
    return segments.join(Constants.LINE_SEPARATOR)
  }

  /**
   * generate credential signtura key
   * @param {String} datestamp yyyyMMDD part of x-sdk-date
   * @return {String} credential signtura key
   */
  generateSigntureKey (datestamp) {
    var dateKey = Utils.Crypto.hmac(Constants.SDK_NAME + this.sk, datestamp, 'buffer')
    var regionKey = Utils.Crypto.hmac(dateKey, this.region, 'buffer')
    var serviceKey = Utils.Crypto.hmac(regionKey, 'vpc', 'buffer')
    return Utils.Crypto.hmac(serviceKey, Constants.SDK_TERMINATOR, 'buffer')
  }

  /**
   * signature a request, add authorization required header to the request
   * @public
   * @param {superagent-request} request the request to be signatured
   * @return
   */
  sign (request) {
    // setup sign on date-time
    var now = new Date()
    request.xSignOn = now

    // YYYYMMDD'T'HHMMSS'Z'
    var sdkdate = Utils.Date.sdkdate(now)
    request.set(Constants.X_SDK_DATE, sdkdate)   // add x-sdk-date header
    // request.set(Constants.CONTENT_TYPE, 'application/json')   // add x-sdk-date header
    // request.set(Constants.HOST, 'sffsd')   // add x-sdk-date header

    var datestamp = Utils.String.substrBefore(sdkdate, 'T')
    var URL = Url.parse(request.url)
    var headers = this.getRequestHeaders(request)

    // Step 2: Create canonical URI--the part of the URI from domain to query
    // must add '/' to the end
    // var canonicalURI = URL.pathname.endsWith('/') ? URL.pathname : URL.pathname + '/'
    var canonicalURI = '/v1/e72385fde3574f8bb07d58f0de8ef948/vpcs/'

    // Step 3: Create the canonical query string. In this example (a GET request),
    // request parameters are in the query string. Query string values must
    // be URL-encoded (space=%20). The parameters must be sorted by name.
    // For this example, the query string is pre-formatted in the request_parameters variable.
    var canonicalQueryString = QS.stringify(Utils.JSON.sort(request.qs || {}))

    // Step 4: Create the list of signed headers. This lists the headers
    // in the canonical_headers list, delimited with ";" and in alpha order.
    // Note: The request can include any headers; canonical_headers and
    // signed_headers lists those that you want to be included in the
    // hash of the request. "Host" and "x-amz-date" are always required.
    var headerNamesToSign = this.getHeaderNamesToSign(headers)

    // Step 5: Create the canonical headers and signed headers. Header names
    // and value must be trimmed and lowercase, and sorted in ASCII order.
    // Note that there is a trailing \n.
    var canonicalHeaders = this.buildCanonicalHeaders(headers)

    // Step 6: Create payload hash (hash of the request body content). For GET
    // requests, the payload is an empty string ("").
    var emptyPayload = (request.method === 'GET' || request.method === 'DELETE')
    var payload = emptyPayload ? '' : request._data
    var payloadHash = Utils.sha256(payload, 'hex')

    // Step 7: Combine elements to create create canonical request
    var canonicalRequest = this.buildCanonicalRequest(request.method, canonicalURI, canonicalQueryString,
                                                      canonicalHeaders, headerNamesToSign, payloadHash)
    console.log(canonicalRequest)
    var canonicalRequestHash = Utils.sha256(canonicalRequest, 'hex')

    // ************* TASK 2: CREATE THE STRING TO SIGN*************
    // Match the algorithm to the hashing algorithm you use, either SHA-1 or SHA-256 (recommended)
    var credentialScope = [datestamp, this.region, 'vpc', Constants.SDK_TERMINATOR].join('/')
    var stringToSign = [this.algorithm, sdkdate, credentialScope, canonicalRequestHash].join(Constants.LINE_SEPARATOR)

    // ************* TASK 3: CALCULATE THE SIGNATURE *************
    // Create the signing key using the function defined above.
    var signtureKey = this.generateSigntureKey(datestamp)
    // Sign the string_to_sign using the signing_key
    var signature = Utils.Crypto.hmac(signtureKey, stringToSign, 'hex')

    // ************* TASK 4: ADD SIGNING INFORMATION TO THE REQUEST *************
    // The signing information can be either in a query string value or in
    // a header named Authorization. This code shows how to use a header.
    // Create authorization header and add to request headers
    var credential = this.ak + '/' + credentialScope
    var authorization = this.algorithm + ' ' + 'Credential=' + credential + ', ' +
                'SignedHeaders=' + headerNamesToSign + ', ' + 'Signature=' + signature
    // request.set(Constants.AUTHORIZATION, authorization)  // add authorization header
    request.set('X-Api-Auth-Header', authorization)  // add authorization header
    // request.set('Host', 'vpc.cn-north-1.myhuaweicloud.com')  // add authorization header
  }

}

module.exports = V4
