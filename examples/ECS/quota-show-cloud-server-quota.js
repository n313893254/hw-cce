/**
 * 查询租户配额
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212674.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 查询租户配额API调用
ECSClient.showCloudServerQuota(function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})
