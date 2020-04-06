const PurchaseService = require('../services/PurchaseService');

class PurchaseController {
  async index(req, res) {
    const response = await PurchaseService.listPurchases({ userId: req.userId });

    return res.json(response);
  }

  async show(req, res) {
    const { id } = req.params;

    const response = await PurchaseService.getPurchaseById({ id });

    return res.json(response);
  }

  async store(req, res) {
    const { title, value } = req.body;

    const response = await PurchaseService.purchase({
      purchase: { title, value, userId: req.userId },
    });

    return res.json(response);
  }
}

module.exports = new PurchaseController();