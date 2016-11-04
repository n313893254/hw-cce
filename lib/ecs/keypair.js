'use strict'

/**
 * keypair related apis
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212675.html
 */

// import ECS constuctor
var ECS = require('./define.js')

/**
 * list keypairs
 * @path GET /v2/{project_id}/os-keypairs
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212676.html
 * @method listKeypairs
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.listKeypairs = function (callback) {
  var resource = '/v2/' + this.projectId + '/os-keypairs'
  this.requestor.get(resource, null, callback)
}

/**
 * get keypair details
 *
 * @path GET /v2/{project_id}/os-keypairs/{keypair_name}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212677.html
 * @method getKeypair
 * @param {String}    keypairName   keypair name
 * @param {Function}  callback Function to be called when request done
 * @return
 */
ECS.prototype.getKeypair = function (keypairName, callback) {
  if (ECS.Utils.String.isBlank(keypairName)) {
    throw new Error('Argument `keypairName` must be a non-blank String')
  }
  var resource = '/v2/' + this.projectId + '/os-keypairs/' + keypairName
  this.requestor.get(resource, null, callback)
}

/**
 * create a new keypair
 * ----
 * 1. keypair name must be unique
 * 2. public key is option, when it is null, will auto generate keypair in server side
 *
 * @path POST /v2/{project_id}/os-keypairs
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212676.html
 * @method createKeypair
 * @param {String}    keypairName   keypair name you want to create, name should not in exists keypairs
 * @param {String}    publicKey     [option] public key, signature length shoule be less than 1024
 * @param {Function}  callback      Function to be called when request done
 * @return
 */
ECS.prototype.createKeypair = function (keypairName, publicKey, callback) {
  if (ECS.Utils.String.isBlank(keypairName)) {
    throw new Error('Argument `keypairName` must be a non-blank String')
  }

  if (publicKey != null && ECS.Utils.String.isBlank(publicKey)) {
    throw new Error('Argument `publicKey` must be a non-blank String')
  }

  var formdata = {
    'keypair': {
      'name': keypairName
    }
  }

  // if public key is present
  if (ECS.Utils.String.isNotBlank(publicKey)) {
    formdata.keypair.public_key = publicKey
  }

  var resource = '/v2/' + this.projectId + '/os-keypairs'
  this.requestor.post(resource, formdata, callback)
}

/*
 * delete an exist keypair by name
 *
 * @path DELETE /v2/{project_id}/os-keypairs/{keypair_name}
 * @see https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212680.html
 * @method deleteKeypair
 * @param {String}    keypairName   keypair name you want to delete
 * @param {Function}  callback      Function to be called when request done
 * @return
 */
ECS.prototype.deleteKeypair = function (keypairName, callback) {
  if (ECS.Utils.String.isBlank(keypairName)) {
    throw new Error('Argument `keypairName` must be a non-blank String')
  }
  var resource = '/v2/' + this.projectId + '/os-keypairs/' + keypairName
  this.requestor.del(resource, callback)
}

