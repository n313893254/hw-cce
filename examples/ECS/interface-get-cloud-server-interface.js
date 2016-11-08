/**
 * 查询云服务器网卡信息
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212661.html
 */

var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 改成你的云服务器ID
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
// 改成你的网卡ID
var portId = '98bcc1ea-0afa-441c-a457-79457112d14e'

ECSClient.getCloudServerInterface(serverId, portId, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

