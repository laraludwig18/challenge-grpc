const UserService = require('../services/UserService');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    try {
      const response = await UserService.loginUser({
        user: { email, password },
      });
  
      return res.json(response);
    } catch(err) {
      return res.status(err.code || 500).json({ message: err.details || 'Internal server error' });
    }
   
  }
}

module.exports = new SessionController();