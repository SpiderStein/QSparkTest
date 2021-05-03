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
                const scrtToPlaintext = req.crypto.guessSecret([...req.body.text], req.size)
                const res = []
                scrtToPlaintext.forEach(txt, scrt => {
                    res.push([scrt, String.fromCharCode(txt)])
                })
                return res
            } catch (err) {
                console.log(err);
                return null
            }
        })

    }
}

module.exports = {
    bruteForce
}