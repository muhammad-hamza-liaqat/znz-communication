const Token = require('../models/blacklistModel');

async function checkExistingToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Unauthorized - Missing Authorization Header' });
    }

    const [, currentToken] = authorizationHeader.split(' ');

    if (!currentToken) {
        return res.status(401).json({ message: 'Unauthorized - Invalid Authorization Header Format' });
    }

    try {
        // Check if the current token exists in the database
        const tokenInDatabase = await Token.findOne({
            where: { token: currentToken },
        });

        if (tokenInDatabase) {
            // Deny access if the current token exists in the database
            return res.status(401).json({ message: 'Unauthorized - Token destroyed' });
        }

        // Continue with the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = checkExistingToken;
