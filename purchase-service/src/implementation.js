const Purchase = require('./models/Purchase');

module.exports = {
    async getPurchaseById(call, callback) {
        const { request } = call;

        const purchase = await Purchase.findById(request.id);

        return callback(null, { purchase });
    },
    async listPurchases(call, callback) {
        const { userId } = call.request;

        const purchases = await Purchase.find({ userId });

        return callback(null, { purchases });
    },
    async purchase(call, callback) {
        const { request } = call;

        const purchase = await Purchase.create(request.purchase);

        return callback(null, {
            purchase: { ...purchase.toObject(), id: purchase._id },
        });
    },
};