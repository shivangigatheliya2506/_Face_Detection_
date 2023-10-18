const jwt = require("jsonwebtoken")

const verifyToken = async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['X-Access-Token']

    if (!token) {
        return res.status(403).send('Missing token.')
    }
    try {
        const decoded = await jwt.verify(token, "test")
        req.user = decoded
    } catch (err) {
        return res.status(401).send('Session timed out or invalid token. Please log in.')
    }
    return next()
}

module.exports = verifyToken