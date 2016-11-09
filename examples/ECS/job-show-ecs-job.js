/**
 * 查询Job状态
 * https://support.hwclouds.com/api-ecs/zh-cn_topic_0022225398.html
 */
var HW = require('../../index.js')

// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = require('../config.json')
// 初始化 ECS Client
var ECSClient = new HW.ECS(config)

var jobId = 'xxx'

ECSClient.showEcsJob(jobId, function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
})
