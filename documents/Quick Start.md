# Quick Start

1.在使用之前，确认你的本地环境安装好了 `Node` 和 `npm`

2.从github上clone一份到本地，并安装所需依赖库

```
> cd your-workspace
> git clone git@github.com:Huawei/eSDK_HWS_ECS_JS.git hw-ecs
> cd hw-ecs
> npm install
```

3.设置 Access-Key，Secret-Key 和 ProjectId，编辑 `examples\config.json`

```
> vi examples/config.json
{
  "ak": "改成你的AccessKey",
  "sk": "改成你的SecretKey",
  "projectId": "改成你的ProjectId",
  "endpoint": "https: //ecs.cn-north-1.myhwclouds.com",
  "region": "cn-north-1"
}
```

4.运行第一个API示例 - 获取所有ECS云服务器

```
> node examples\ECS\lifecycle-list-cloud-servers.js
```

5.`examples\ECS` 目录下有更多的示例，部分示例可以直接运行，部分需要根据你的后台调整一些参数


| 例子文件                                                                                          | API        |
|--------------------------------------------------------------------------------------------------|------------|
| [lifecycle-create-cloud-server.js](../examples/ECS/lifecycle-create-cloud-server.js)             | 创建云服务器     |
| [lifecycle-delete-cloud-server.js](../examples/ECS/lifecycle-delete-cloud-server.js)             | 删除云服务器     |
| [lifecycle-get-cloud-server.js](../examples/ECS/lifecycle-get-cloud-server.js)                   | 获取云服务器详情   |
| [lifecycle-list-cloud-servers.js](../examples/ECS/lifecycle-list-cloud-servers.js)               | 获取云服务器列表   |
| [lifecycle-list-cloud-server-details.js](../examples/ECS/lifecycle-list-cloud-server-details.js) | 获取云服务器详情列表 |

6.更多API接口说明，请参见 API说明文档

# How to Contribute

1. 在lib下找到对应的接口模块，目前，只有ECS模块，那么对应的接口实现写在ecs目录下。具体的代码样例，请参考其他的接口实现

2. 每个新增的接口，都要有对应的调用示例，对应的目录是 examples。同时，需要编写对应的测试用例，测试用例目录是test。

3. 提供了几个快捷命令
- `npm test`，执行测试用例（mocha）
- `npm run coverage` 执行测试用例，并生成覆盖率报告
- `npm run lint` 代码格式检测
- `npm run browserify` 会在dist下生成对应的浏览器版本（未测试）


