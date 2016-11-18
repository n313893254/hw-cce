## 弹性云服务器状态管理 [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212691.html)

### 1. 修改云服务器 [例子](../examples/ECS/status-modify-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212692.html)

```
ECSClient.modifyCloudServer(serverId, newName, callback)
```

|   参数   |   类型   | 是否必填 | 说明                   | 例子 |
|:--------:|:--------:|:--------:|------------------------|------|
| serverId |  string  |    是    | 要修改的云服务器ID     |      |
|  newName |  string  |    是    | 要修改成的云服务器名称 |      |
| callback | function |    否    | 请求回调               |      |

> 目前只能修改云服务名称

### 2. 批量启动云服务器 [例子](../examples/ECS/status-batch-start-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212207.html)

```
var serverIds = ['server-id-1', 'server-id-2']
ECSClient.startBatchCloudServers(serverIds, callback)
```

|    参数   |   类型   | 是否必填 | 说明                   | 例子                           |
|:---------:|:--------:|:--------:|------------------------|--------------------------------|
| serverIds |   array  |    是    | 要启动的云服务器ID列表 | ['server-id-1', 'server-id-2'] |
|  callback | function |    否    | 请求回调               |                                |

### 3. 启动云服务器 [例子](../examples/ECS/status-start-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212648.html)

```
var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // 改成想要操作的云服务器ID
ECSClient.startCloudServer(serverId, callback)
```

|   参数   |   类型   | 是否必填 | 说明               | 例子 |
|:--------:|:--------:|:--------:|--------------------|------|
| serverId |  string  |    是    | 要启动的云服务器ID |      |
| callback | function |    否    | 请求回调           |      |


### 4. 批量重启云服务器 [例子](../examples/ECS/status-batch-reboot-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212649.html)

```
var serverIds = ['server-id-1', 'server-id-2']
var forceStop = true
ECSClient.rebootBatchCloudServers(serverIds, forceStop, callback)
```

|    参数   |   类型   | 是否必填 | 说明                   | 例子                           |
|:---------:|:--------:|:--------:|------------------------|--------------------------------|
| serverIds |   array  |    是    | 要重启的云服务器ID列表 | ['server-id-1', 'server-id-2'] |
| forceStop |  boolean |    否    | 是否强制重启,默认false | true|false|null                |
|  callback | function |    否    | 请求回调               |                                |


### 5. 重启云服务器 [例子](../examples/ECS/status-reboot-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212650.html)

```
var forceStop = false
var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // 改成想要操作的云服务器ID
ECSClient.rebootCloudServer(serverId, forceStop, callback)
```

|    参数   |   类型   | 是否必填 | 说明                   | 例子 |
|:---------:|:--------:|:--------:|------------------------|------|
|  serverId |  string  |    是    | 要重启的云服务器ID     |      |
| forceStop |  boolean |    否    | 是否强制重启,默认false | true |
|  callback | function |    否    | 请求回调               |      |

### 6. 批量关闭云服务器 [例子](../examples/ECS/status-batch-stop-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212651.html)

```
var serverIds = ['server-id-1', 'server-id-2']
var forceStop = true
ECSClient.stopBatchCloudServers(serverIds, forceStop, callback)
```

|    参数   |   类型   | 是否必填 | 说明                     | 例子                           |
|:---------:|:--------:|:--------:|--------------------------|--------------------------------|
| serverIds |   array  |    是    | 要关闭的云服务器ID列表   | ['server-id-1', 'server-id-2'] |
| forceStop |  boolean |    否    | 是否要强制关闭,默认false | true                           |
|  callback | function |    否    | 请求回调                 |                                |

### 7. 关闭云服务器 [例子](../examples/ECS/status-stop-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212652.html)

```
var forceStop = false
var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // 改成想要操作的云服务器ID
ECSClient.stopCloudServer(serverId, forceStop, callback)
```

|    参数   |   类型   | 是否必填 | 说明                     | 例子 |
|:---------:|:--------:|:--------:|--------------------------|------|
|  serverId |  string  |    是    | 要关闭的云服务器ID       |      |
| forceStop |  boolean |    否    | 是否要强制关闭,默认false | true |
|  callback | function |    否    | 请求回调                 |      |


### 8. 变更云服务器规格 [例子](../examples/ECS/status-resize-cloud-server.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212653.html)

```
var flavorId = 'c1.large' // http://support.hwclouds.com/usermanual-ecs/zh-cn_topic_0035470096.html
var serverId = '89351b6c-3ffd-497d-8f06-822ecfbedab1' // 改成想要操作的云服务器ID
// 注意需要先关闭服务器，才能进行修改配额操作
ECSClient.resizeCloudServer(serverId, flavorId, callback)
```

|   参数   |   类型   | 是否必填 | 说明               | 例子       |
|:--------:|:--------:|:--------:|--------------------|------------|
| serverId |  string  |    是    | 要变更的云服务器ID |            |
| flavorId |  string  |    是    | 云服务器规格ID     | 'c1.large' |
| callback | function |    否    | 请求回调           |            |