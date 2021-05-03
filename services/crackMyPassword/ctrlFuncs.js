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
                const scrtToPlaintext = req.crypto.guessSecret([...req.body.text], req.body.size)
                const res = []
                scrtToPlaintext.forEach((txt, scrt) => {
                    res.push([scrt, String.fromCharCode(txt)])
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