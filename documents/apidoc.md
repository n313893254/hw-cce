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

## 各个模块的API接口

- <a href="./lifecycle-apidoc.md" target="_blank">弹性云服务器生命周期管理</a>
- <a href="./status-apidoc.md" target="_blank">弹性云服务器状态管理</a>
- <a href="./flavor-apidoc.md" target="_blank">弹性云服务器规格查询</a>
- <a href="./interface-apidoc.md" target="_blank">弹性云服务器网卡管理</a>
- <a href="./lifecycle-apidoc.md" target="_blank">弹性云服务器生命周期管理</a>
- <a href="./volume-apidoc.md" target="_blank">弹性云服务器磁盘管理</a>
- <a href="./quota-apidoc.md" target="_blank">弹性云服务器租户配额管理</a>
- <a href="./keypair-apidoc.md" target="_blank">弹性云服务器SSH密钥管理</a>
- <a href="./job-apidoc.md" target="_blank">弹性云服务器租户配额管理</a>

