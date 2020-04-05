const UserService = require('../services/UserService');

class UserController {
  async show(req, res) {
    const { params } = req;

    try {
      const { user: { id, email, username } } = await UserService.getUserById({ ...params });

      return res.json({ user: { id, email, username } });
    } catch (err) {
      return res.status(err.code || 500).json({ message: err.details || "Internal server error" });
    }
  }

  async store(req, res) {
    const { user: { id, email, username } } = await UserService.registerUser({
      user: req.body,
    });

    return res.json({ user: { id, email, username } });
  }
}

module.exports = new UserController();