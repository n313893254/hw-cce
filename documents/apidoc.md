# API documents

本文档主要用于描述 ECS Node SDK 的各个接口的使用方式，更多详细的内容请参照官方的[文档](https://support.hwclouds.com/ecs/index.html)

## 公共说明
### 1. 初始化SDK客户端对象

```
// 获取配置项，需要修改成你自己的AK，SK，ProjectId
var config = {
  "ak": "您的 Access Key",
  "sk": "您的 Secret Key",
  "projectId": "您的ProjectId",
  "endpoint": "https://ecs.cn-north-1.myhwclouds.com",
  "region": "cn-north-1"
}

// 初始化 ECS SDK Client
var HW = require('hw-ecs')
var ECSClient = new HW.ECS(config) 
```

> 通过初始化完成的 `ECSClient`, 可以使用所有ECS相关的API

### 2. 请求返回回调

所有的接口请求，最后一个参数都是回调函数，在API异步请求完成后，会执行该函数。执行回调函数时，会传递两个参数：

| 参数     | 作用                               |
|----------|------------------------------------|
| err      | 当执行请求异常时的错误信息         |
| response | HTTP请求的返回对象                 |

response中包含完整的 HTTP response 信息，比较常用到的有 body text | status 这些属性

| 属性   | 作用             | 备注                                  |
|--------|------------------|---------------------------------------|
| body   | json格式的返回值 | 返回的conent-type是application/json时 |
| text   | 文本格式的返回值 |                                       |
| ok     | 请求是否成功     | 返回4xx,5xx的状态码时，ok=false       |
| status | http状态         |                                       |

回调使用例子：

```
var callback = function (err, response) {
  if (!err && response.ok) {
    console.log(JSON.stringify(response.body, null, 2))
  } else {
    console.log(err)
  }
}

var filters = { limit: 10, 'name': 'example' }
// 调用查询云服务器详情API
ECSClient.listCloudServerDetails(filters, callback)
```

## 弹性云服务器生命周期管理

### 1. 创建云服务器 ([例子](../examples/ECS/lifecycle-create-cloud-server.js))

```
ECSClient.createCloudServer(params, callback)
```

|   参数   | 是否必填 | 说明                 | 例子                                                             |
|:--------:|:--------:|----------------------|------------------------------------------------------------------|
|  params  |    是    | 要创建的云服务器配置 | https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212668.html |
| callback |    是    | 请求回调             |                                                                  |


### 2. 删除云服务器 ([例子](../examples/ECS/lifecycle-delete-cloud-server.js))

```
ECSClient.deleteCloudServer(serverId, deletePublicId, deleteVolume, callback)
```

| 参数           | 类型     | 必填 | 说明                         | 例子 |
|----------------|----------|------|------------------------------|------|
| serverId       | String   | 是   | 要删除的服务器ID             |      |
| deletePublicId | boolean  | 是   | 是否删除云服务器绑定的弹性IP |      |
| deleteVolume   | boolean  | 是   | 是否删除云服务器数据盘       |      |
| callback       | function | 否   | 请求回调                     |      |


### 3. 查询云服务器列表 

[例子](../examples/ECS/lifecycle-list-cloud-servers.js)
[官方文档](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212688.html)

```
var filters = { limit: 10, 'name': 'example' }
ECSClient.listCloudServers(filters, callback)
```

| 参数     | 类型     | 必填 | 说明     | 例子                             |
|----------|----------|------|----------|----------------------------------|
| filters  | json     | 否   | 查询条件 | { limit: 10, 'name': 'example' } |
| callback | function | 否   | 请求回调 |                                  |

filters 参数可设置的属性

| 名称          | 是否必选 | 参数类型        | 说明                               |
|---------------|----------|-----------------|------------------------------------|
| changes-since | 否       | String:DateTime | 云服务器上次更新状态的时间戳信息。 |
| image         | 否       | String          | 镜像ID。                           |
| flavor        | 否       | String          | 云服务器类型ID。                   |
| name          | 否       | String          | 云服务器名称。                     |
| status        | 否       | String          | 云服务器状态。                     |
| host          | 否       | String          | 主机节点名称。                     |
| limit         | 否       | Integer         | 查询返回云服务器数量限制。         |
