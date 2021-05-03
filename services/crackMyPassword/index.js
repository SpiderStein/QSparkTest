const run = require('./server')

function getServerDependencies() {
    const fastify = require('fastify')()
    const ctrlFuncs = require('./ctrlFuncs')
    const cors = require('fastify-cors')
    const crypto = require('./services/crypto.js')

    return {
        fastify,
        ctrlFuncs: ctrlFuncs,
        cors,
        crypto
    }
}

(async function EntryPoint() {
    await run(getServerDependencies())
})()