/**
 * 创建和导入SSH密钥
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212678.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

var keypairName = 'woo-' + new Date().getTime()
var publicKey = 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAAAgQCTVFCmWNGle5wIStZ21fjfiHz+l77lPPlg57gdoObMr0Weh+TftCNF2FmX/1HlBW3Ie+fiMPEgAxCkWMSVv9SxsdnsepM3Kc6AHeF/saw1IL5dn5pmtg+SvD/H3cZ0VVViP3hcuVti/C1/YTw4A+bikTGfzYnQW1DwDCRxy7rj2Q== RSA-1024'


// public key 为空，当为空时，将从服务器端自行创建
ECSClient.createKeypair(keypairName, null, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

// public key 不为空
keypairName = 'woo-' + new Date().getTime()
ECSClient.createKeypair(keypairName, publicKey, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})
