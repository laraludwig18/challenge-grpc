const UserService = require('../services/UserService');

module.exports = async (req, res, next) => {
  try {
    const response = await UserService.authenticate({
      token: req.headers.authorization,
    });

    req.userId = response.user.id;

    next();
  } catch (err) {
    return res.status(err.code || 500).json({ message: err.details || 'Internal server error' });
  }
};