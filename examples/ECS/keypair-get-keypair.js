/**
 * 查询SSH密钥详情
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212677.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 从服务器获得所有的 keypairs
ECSClient.listKeypairs(function (err, response) {
  if (!err && response.ok) {
    var keypairs = response.body.keypairs
    var keypair0 = keypairs.length > 0 && keypairs[0].keypair.name
    if (keypair0) {
      console.log('try to get keypair detail : ' + keypair0)
      // 删除 ssh keypair
      ECSClient.getKeypair(keypair0, function (err, response) {
        if (!err && response.ok) {
          console.log(response.body)
        }
      })
    }
  }
})
