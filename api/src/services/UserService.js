const load = require('../pb/loader');

const UserServiceClient = load({
  serviceName: 'UserService',
  address: 'localhost:3334',
  fileName: 'userService',
});

module.exports = UserServiceClient;