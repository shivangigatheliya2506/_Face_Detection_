const crypto = require ("crypto")

module.exports = {
    euclideanDistance: (featuresA, featuresB) => {
        return featuresA.map((x, i) => Math.abs( x - featuresB[i] ) ** 2).reduce((sum, now) => sum + now) ** (1/2)
    },
    manhattanDistance: (featuresA, featuresB) => {
        return featuresA.map((x, i) => Math.abs( x - featuresB[i] )).reduce((sum, now) => sum + now)
    },
    getInitializationVector: (len) => {
        return crypto.randomBytes(len)
    },
    encryptBiometrics: (decriptor, iv) => {
        const message = decriptor.join('###')
        const salt = "foobar";
        const hash = crypto.createHash("sha1");

        hash.update(salt);

        // `hash.digest()` returns a Buffer by default when no encoding is given
        let key = hash.digest().slice(0, 16);

        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
        let encryptedData = cipher.update(message, 'utf-8', 'hex')        
        encryptedData += cipher.final('hex')
        return encryptedData
    },
    decryptBiometrics: (descriptor, iv) => {
        const decipher = crypto.createDecipheriv('aes-256-cbc', PRIVATE_KEY, iv)
        let decryptedData = decipher.update(descriptor, 'hex', 'utf-8')
        decryptedData += decipher.final('utf8')
        return decryptedData.split('###')
    }
}