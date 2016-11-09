/**
 * 查询云服务器规格详情列表
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212658.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')

// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

// 查询条件
var filters = {sort_key: 'memory_mb2', minDisk: '10', 'xxx': 'xxxs'}
// 查询云服务器规格详情列表
ECSClient.listFlavorDetails(filters, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})
