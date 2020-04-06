const load = require('../pb/loader');

const PurchaseServiceClient = load({
  serviceName: 'PurchaseService',
  address: 'localhost:3335',
  fileName: 'purchaseService',
});

module.exports = PurchaseServiceClient;