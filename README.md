# HuaWei ECS Javascript Library

[![Build Status](https://travis-ci.org/Huawei/eSDK_HWS_ECS_JS.svg?branch=master)](https://travis-ci.org/Huawei/eSDK_HWS_ECS_JS)

The official HW ECS SDK for JavaScript, available for browsers & Node.js

## Installation

### In Node.js

Use [npm](http://npmjs.org) package manager for Node.js. Simply type the following into a terminal window:

```bash
npm install hw-ecs
```

>Not support for now, the SDK will be published to npm when released

### In the Browser

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

```Javascript
    <script src="dist/hw-ecs-version.standalone.js"></script>
```

## Usage and Getting Started

You can list cloud ECS servers through:

```Javascript
var config = {
  'ak': 'Your Access Key',
  'sk': 'Your Secret Key',
  'projectId': 'Your Project Id', 
  'endpoint': 'https://ecs.cn-north-1.myhwclouds.com', // same as default
  'region': 'cn-north-1'  // same as default
}

var ECS = new HW.ECS(config)

// list cloud ECS servers
client.listCloudServers({ limit: 10 }, function (err, response) {
  if(!err && response.status === 200) {
    // response.body is the content returned from server
    console.log(response.body) 
  }
})
```

You can get more detail about the API from [document](https://support.hwclouds.com/api-ecs/zh-cn_topic_0020212657.html)

## License

This SDK is distributed under the [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0), see LICENSE.txt for more information.

