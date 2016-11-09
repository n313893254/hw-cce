## 弹性云服务器规格查询 [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212655.html)

### 1. 查询云服务器规格详情和扩展信息列表 [例子](../examples/ECS/flavor-list-flavor-details.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212658.html)

```
ECSClient.listFlavorDetails(callback)
```

|   参数   |   类型   | 是否必填 | 说明                   | 例子 |
|:--------:|:--------:|:--------:|------------------------|------|
| callback | function |    否    | 请求回调               |      |


### 2. 查询云服务器规格详情列表 [例子](../examples/ECS/flavor-list-cloud-server-flavors) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212658.html)

```
ECSClient.listFlavorDetails(callback)
```

|   参数   |   类型   | 是否必填 | 说明                   | 例子 |
|:--------:|:--------:|:--------:|------------------------|------|
| callback | function |    否    | 请求回调               |      |

### 3. 启动云服务器 [例子](../examples/ECS/flavor-get-flavor.js) [官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212659.html)

```
var flavorId = 'c1.large'
ECSClient.getFlavor(flavorId, callback)
```

|   参数   |   类型   | 是否必填 | 说明           | 例子 |
|:--------:|:--------:|:--------:|----------------|------|
| flavorId |  string  |    是    | 云服务器规格Id |      |
| callback | function |    否    | 请求回调       |      |
