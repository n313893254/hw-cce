/**
 * 批量添加云服务器网卡
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212663.html
 */

var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
ECSClient.detachBatchCloudServerInterface(serverId, null, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

