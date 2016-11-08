require('should')
var nock = require('nock')

var config = require('./config.js')
var HW = require('../../index.js')
var client = new HW.ECS(config)

describe('ECS::Interface', function () {
  var endpoint = config.endpoint
  var projectId = config.projectId

  describe('list cloud-server interfaces', function () {
    var respBody = require('./data/interface-list-cloud-server-interfaces-resp.json')
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'

    it('list cloud-server interface', done => {
      var url = `/v2/${projectId}/servers/${serverId}/os-interface`
      nock(endpoint).get(url).reply(200, respBody)
      client.listCloudServerInterfaces(serverId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal server id argument will throw error', () => {
      client.listCloudServerInterfaces.bind(client, '').should.throw()
      client.listCloudServerInterfaces.bind(client, {}).should.throw()
      client.listCloudServerInterfaces.bind(client, []).should.throw()
      client.listCloudServerInterfaces.bind(client, null).should.throw()
      client.listCloudServerInterfaces.bind(client, new Date()).should.throw()
    })
  })

  describe('get cloud-server interface', function () {
    var respBody = require('./data/interface-get-cloud-server-interface-resp.json')
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
    var portId = respBody.interfaceAttachment.port_id

    it('get cloud-server interface', done => {
      var url = `/v2/${projectId}/servers/${serverId}/os-interface/${portId}`
      nock(endpoint).get(url).reply(200, respBody)
      client.getCloudServerInterface(serverId, portId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal argument will throw error', () => {
      client.getCloudServerInterface.bind(client, '', portId).should.throw()
      client.getCloudServerInterface.bind(client, {}, portId).should.throw()
      client.getCloudServerInterface.bind(client, [], portId).should.throw()
      client.getCloudServerInterface.bind(client, null, portId).should.throw()
      client.getCloudServerInterface.bind(client, new Date(), portId).should.throw()
      client.getCloudServerInterface.bind(client, serverId, '').should.throw()
      client.getCloudServerInterface.bind(client, serverId, {}).should.throw()
      client.getCloudServerInterface.bind(client, serverId, []).should.throw()
      client.getCloudServerInterface.bind(client, serverId, null).should.throw()
      client.getCloudServerInterface.bind(client, serverId, new Date()).should.throw()
    })
  })

  describe('attach cloud-server interface', function () {
    var respBody = require('./data/interface-attach-cloud-server-interface-resp.json')
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
    var portId = respBody.interfaceAttachment.port_id
    var netId = respBody.interfaceAttachment.net_id
    var fixedIp = respBody.interfaceAttachment.fixed_ips[0].ip_address
    var url = `/v2/${projectId}/servers/${serverId}/os-interface`

    it('attach cloud-server interface with port-id', done => {
      var formdata = {
        'interfaceAttachment': {
          'port_id': portId
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.attachCloudServerInterface(serverId, portId, null, null, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('attach cloud-server interface with net-id', done => {
      var formdata = {
        'interfaceAttachment': {
          'net_id': netId
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.attachCloudServerInterface(serverId, null, netId, null, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('attach cloud-server interface with net-id & fixed-ip', done => {
      var formdata = {
        'interfaceAttachment': {
          'net_id': netId,
          'fixed_ips': [{
            'ip_address': fixedIp
          }]
        }
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.attachCloudServerInterface(serverId, null, netId, fixedIp, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal argument will throw error', () => {
      client.attachCloudServerInterface.bind(client, null, null).should.throw()
      client.attachCloudServerInterface.bind(client, serverId, []).should.throw()
      client.attachCloudServerInterface.bind(client, serverId, {}).should.throw()
      client.attachCloudServerInterface.bind(client, serverId, '').should.throw()
      client.attachCloudServerInterface.bind(client, serverId, null, '').should.throw()
      client.attachCloudServerInterface.bind(client, serverId, null, []).should.throw()
      client.attachCloudServerInterface.bind(client, serverId, null, {}).should.throw()
      client.attachCloudServerInterface.bind(client, serverId, null, true).should.throw()
      client.attachCloudServerInterface.bind(client, serverId, '').should.throw()
    })
  })

  describe('batch attach cloud-server interfaces', function () {
    var respBody = require('./data/success-task-response.json')
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'

    it('batch attach interfaces', done => {
      var url = `/v1/${projectId}/cloudservers/${serverId}/nics`
      // argument
      var subnets = [{
        'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
        'securityGroupId': 'b4b7153c-bf90-444a-b696-e63518031c15',
        'ipAddress': '10.10.2.20'
      }, {
        'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
        'securityGroupId': 'b4b7153c-bf90-444a-b696-e63518031c15',
        'ipAddress': '10.10.2.21'
      }]

      // expect formdata
      var formdata = {
        'nics': [{
          'subnet_id': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
          'ip_address': '10.10.2.20',
          'security_groups': [{
            'id': 'b4b7153c-bf90-444a-b696-e63518031c15'
          }]
        }, {
          'subnet_id': '938e53a3-a2dd-47c9-a63b-4bbdd299d430',
          'ip_address': '10.10.2.21',
          'security_groups': [{
            'id': 'b4b7153c-bf90-444a-b696-e63518031c15'
          }]
        }]
      }

      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.attachBatchCloudServerInterface(serverId, subnets, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('batch attach interfaces with only subnets', done => {
      var url = `/v1/${projectId}/cloudservers/${serverId}/nics`
      // argument
      var subnets = [{
        'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430'
      }, {
        'subnetId': '938e53a3-a2dd-47c9-a63b-4bbdd299d430'
      }]

      // expect formdata
      var formdata = {
        'nics': [{
          'subnet_id': '938e53a3-a2dd-47c9-a63b-4bbdd299d430'
        }, {
          'subnet_id': '938e53a3-a2dd-47c9-a63b-4bbdd299d430'
        }]
      }

      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.attachBatchCloudServerInterface(serverId, subnets, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal argument will throw error', () => {
      client.attachBatchCloudServerInterface.bind(client, '').should.throw()
      client.attachBatchCloudServerInterface.bind(client, {}).should.throw()
      client.attachBatchCloudServerInterface.bind(client, []).should.throw()
      client.attachBatchCloudServerInterface.bind(client, null).should.throw()
      client.attachBatchCloudServerInterface.bind(client, new Date()).should.throw()
      client.attachBatchCloudServerInterface.bind(client, serverId, '').should.throw()
      client.attachBatchCloudServerInterface.bind(client, serverId, {}).should.throw()
      client.attachBatchCloudServerInterface.bind(client, serverId, []).should.throw()
      client.attachBatchCloudServerInterface.bind(client, serverId, null).should.throw()
      client.attachBatchCloudServerInterface.bind(client, serverId, new Date()).should.throw()
      client.attachBatchCloudServerInterface.bind(client, serverId, [{}, {}]).should.throw()
    })
  })

  describe('detach cloud-server interface', function () {
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
    var portId = '4b022d6b-74a9-4d39-8678-356d403f985a'

    it('detach cloud-server interface', done => {
      var url = `/v2/${projectId}/servers/${serverId}/os-interface/${portId}`
      nock(endpoint).intercept(url, 'DELETE').reply(200, '')
      client.detachCloudServerInterface(serverId, portId, function (err, response) {
        (err || !response.ok).should.be.false()
        response.text.should.eql('')
        done()
      })
    })

    it('illegal argument will throw error', () => {
      client.detachCloudServerInterface.bind(client, '', portId).should.throw()
      client.detachCloudServerInterface.bind(client, {}, portId).should.throw()
      client.detachCloudServerInterface.bind(client, [], portId).should.throw()
      client.detachCloudServerInterface.bind(client, null, portId).should.throw()
      client.detachCloudServerInterface.bind(client, new Date(), portId).should.throw()
      client.detachCloudServerInterface.bind(client, serverId, '').should.throw()
      client.detachCloudServerInterface.bind(client, serverId, {}).should.throw()
      client.detachCloudServerInterface.bind(client, serverId, []).should.throw()
      client.detachCloudServerInterface.bind(client, serverId, null).should.throw()
      client.detachCloudServerInterface.bind(client, serverId, new Date()).should.throw()
    })
  })

  describe('batch detach cloud-server interface', function () {
    var serverId = 'aaf8a245-5c71-4224-928c-628350974e99'
    var ports = ['2df10824-025a-45e3-8fea-304a3ccf65ed', '46328e74-53bf-4144-bfc8-437aef96f665']
    var url = `/v1/${projectId}/cloudservers/${serverId}/nics/delete`
    var respBody = require('./data/success-task-response.json')

    it('batch detach cloud-server interface', done => {
      var formdata = {
        'nics': [
          {
            'id': '2df10824-025a-45e3-8fea-304a3ccf65ed'
          },
          {
            'id': '46328e74-53bf-4144-bfc8-437aef96f665'
          }
        ]
      }
      nock(endpoint).post(url, formdata).reply(200, respBody)
      client.detachBatchCloudServerInterface(serverId, ports, function (err, response) {
        (err || !response.ok).should.be.false()
        response.body.should.containDeep(respBody)
        done()
      })
    })

    it('illegal argument will throw error', () => {
      client.detachBatchCloudServerInterface.bind(client, '').should.throw()
      client.detachBatchCloudServerInterface.bind(client, {}).should.throw()
      client.detachBatchCloudServerInterface.bind(client, []).should.throw()
      client.detachBatchCloudServerInterface.bind(client, null).should.throw()
      client.detachBatchCloudServerInterface.bind(client, new Date()).should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, '').should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, {}).should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, []).should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, null).should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, new Date()).should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, [null]).should.throw()
      client.detachBatchCloudServerInterface.bind(client, serverId, ['']).should.throw()
    })
  })
})
