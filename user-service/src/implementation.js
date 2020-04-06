const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./models/User');

module.exports = {
    async getUserById(call, callback) {
        const { id } = call.request;

        try {
            const user = await User.findById(id);

            return callback(null, { user });
        } catch (err) {
            return callback({
                code: 400,
                message: 'User not found',
            });
        }
    },
    async registerUser(call, callback) {
        const { request } = call;

        const user = await User.create(request.user);

        return callback(null, { user: { ...user.toObject(), id: user._id } });
    },
    async loginUser(call, callback) {
        const { email, password } = call.request.user;

        const user = await User.findOne({ email });

        if (!user) {
            return callback({
                code: 400,
                message: 'User not found',
            })
        }

        if (!(await user.compareHash(password))) {
            return callback({
                code: 400,
                message: 'Invalid password',
            })
        }

        const token = User.generateToken(user);

        return callback(null, {
            token,
        });
    },
    async authenticate(call, callback) {
        const { token: fullToken } = call.request;

        if (!fullToken) {
            return callback({
                code: 401,
                message: 'No token provided',
            })
        }

        const parts = fullToken.split(' ');

        if (!parts.length === 2) {
            return callback({
                code: 401,
                message: 'Token error',
            })
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return callback({
                code: 401,
                message: 'Token malformatted',
            })
        }

        try {
            const decoded = await promisify(jwt.verify)(token, 'mySecret');

            const user = await User.findById(decoded.id);

            return callback(null, { user });
        } catch (err) {
            return callback({
                code: 401,
                message: 'Token invalid',
            })
        }
    },
}