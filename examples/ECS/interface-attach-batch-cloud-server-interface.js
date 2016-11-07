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

// 要批量添加的子网信息，subnetId字段是必须的，其他两个都不是必须的
var subnets = [{
  'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
  'securityGroupId': 'b4b7153c-bf90-444a-b696-e63518031c15',
  'ipAddress': '10.10.2.20'
}, {
  'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
  'securityGroupId': 'b4b7153c-bf90-444a-b696-e63518031c15',
  'ipAddress': '10.10.2.21'
}]

// 提交批量添加网卡请求
ECSClient.attachBatchCloudServerInterface(serverId, subnets, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

