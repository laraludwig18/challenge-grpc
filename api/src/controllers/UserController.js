const UserService = require('../services/UserService');

class UserController {
  async show(req, res) {
    const { params } = req;

    try {
      const { user } = await UserService.getUserById({ ...params });

      return res.json({ user });
    } catch (err) {
      return res.status(err.code || 500).json({ message: err.details || "Internal server error" });
    }
  }

  async store(req, res) {
    const { user } = await UserService.registerUser({
      user: req.body,
    });

    return res.json({ user });
  }
}

module.exports = new UserController();