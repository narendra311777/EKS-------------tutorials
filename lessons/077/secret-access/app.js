var AWS = require('aws-sdk'),
    region = "prod/bot/token",
    secretName = "prod/some",
    secret,
    decodedBinarySecret;

var client = new AWS.SecretsManager({
    region: region
});

exports.handler = function (event, context, callback) {
    client.getSecretValue({ SecretId: secretName }, function (err, data) {

        if (err) {
            if (err.code === 'DecryptionFailureException')
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                throw err;
            else if (err.code === 'InvalidParameterException')
                throw err;
            else if (err.code === 'InvalidRequestException')
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                throw err;
        }
        else {
            if ('SecretString' in data) {
                secret = data.SecretString;
                console.log("HERE:")
                console.log(secret)
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        }
        console.log("HERE2:")
        console.log(data)
    });

    callback(null)
}
