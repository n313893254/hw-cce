/**
 * 获取云服务器详情列表例子
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 查询参数，https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212689.html
var filters = { limit: 10, 'name': 'example' }
// 调用查询云服务器详情API
ECSClient.listCloudServerDetails(filters, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})

