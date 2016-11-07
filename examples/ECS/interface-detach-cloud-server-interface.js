/**
 * 删除云服务器网卡
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212666.html
 */

var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

var serverId = 'aaf8a245-5c71-4224-928c-628350974e99' // 改成你的云服务器ID
var portId = '4b022d6b-74a9-4d39-8678-356d403f985a' // 改成你的网卡ID，不能是主网卡
ECSClient.detachCloudServerInterface(serverId, portId, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

