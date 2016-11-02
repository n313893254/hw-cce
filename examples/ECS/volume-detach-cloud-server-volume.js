/**
 * 弹性云服务器卸载磁盘
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0022472988.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 改成你的云服务ID
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
// 改成你的磁盘ID
var volumeId = 'dafc8dc4-e9a7-404d-afd7-5e49cd0d29e0'

// 卸载磁盘
ECSClient.detachCloudServerVolume(serverId, volumeId, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

