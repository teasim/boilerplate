const fackers = require('teasim-fackers').default;
const mockers = require('../internals/genmocker/index');
const { getProfileBasicData, getProfileAdvancedData } = require('./profile');

const proxy = {
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'GET /api/tags': fackers.mock({
    'list|100': [
      {
        name: '@city',
        'value|1-100': 150,
        'type|0-2': 1,
      },
    ],
  }),
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === '123456' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        authority: 'admin',
      });
      return;
    }
    if (password === '123456' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        authority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      authority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', authority: 'user' });
  },
};

module.exports = mockers(proxy);
