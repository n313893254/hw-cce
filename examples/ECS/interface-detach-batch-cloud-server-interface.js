/**
 * 批量删除云服务器网卡
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212665.html
 */

var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 改成你的云服务器ID
var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
// 要删除的网卡ID数组
var ports = ['2df10824-025a-45e3-8fea-304a3ccf65ed', '46328e74-53bf-4144-bfc8-437aef96f665']
ECSClient.detachBatchCloudServerInterface(serverId, ports, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

