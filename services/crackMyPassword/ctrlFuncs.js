const bruteForce = {
    method: 'POST',
    url: '/bruteforce',
    schema: {
        body: {
            text: { type: 'string' },
            size: { type: 'number' }
        }
    },
    handler: async function (req, reply) {
        setImmediate(() => {
            try {
                const scrtToPlaintext = req.crypto.guessSecret(req.body.text.split(','), req.body.size)
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