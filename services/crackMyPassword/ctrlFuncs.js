const bruteForce = {
    method: 'POST',
    url: '/bruteforce',
    schema: {
        body: {
            text: { type: 'string' },
            size: { type: 'number' }
        },
        response: {
            200: {
                type: 'array',
                items: [
                    {
                        type: 'string'
                    },
                    {
                        type: 'string'
                    }
                ]
            }
        }
    },
    handler: async function (req, reply) {
        setImmediate(() => {
            try {
                const asciiEncodedText = [...req.body.text].map(char => char = char.charCodeAt())
                const scrtToPlaintext = req.crypto.guessSecret(asciiEncodedText, req.body.size)
                const res = []
                scrtToPlaintext.forEach((txt, scrt) => {
                    res.push([scrt, txt])
                })
                reply.send(res)
            } catch (err) {
                console.log(err);
                throw err
            }
        })

    }
}

module.exports = {
    bruteForce
}