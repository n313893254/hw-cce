/**
 * 关闭云服务器例子
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212652.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 是否强制关机
var forceStop = null
var serverId = '33e19653-0f87-40ba-a13b-17727cc989e1' // 改成想要操作的云服务器ID
ECSClient.stopCloudServer(serverId, forceStop, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})
