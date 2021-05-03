const _ = require('lodash')

/**
 * @param {number[]} input 
 * @param {string} secret
 */
function symmCipher(input, secret) {
    const asciiEncodedScrt = [] // contains numbers.
    for (const char of secret) {
        asciiEncodedScrt.push(char.charCodeAt())
    }
    input = [...input]
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i] ^ (asciiEncodedScrt[i % asciiEncodedScrt.length])
    }
    return input
}

/**
 * @param {number[]} cipherText 
 * @param {number} secretLen 
 * @returns {Map<string, string>}
 */
function guessSecret(cipherText, secretLen) {
    const map = new Map()
    let genSecret = _.pad('', secretLen, 'a')
    let lastGenScrt = _.pad('', secretLen, 'z')
    while (genSecret !== lastGenScrt) {
        let plainText = symmCipher(cipherText, genSecret)
        plainText = String.fromCharCode(...plainText)
        map.set(genSecret, plainText)

        genSecret = getScrtSuccessor(genSecret, secretLen)
    }
    let plainText = symmCipher(cipherText, genSecret)
    plainText = String.fromCharCode(...plainText)
    map.set(genSecret, plainText)

    return map
}

/**
 * 
 * @param {string} genSecret 
 * @param {number} secretLen 
 * @returns {string}
 */
function getScrtSuccessor(genSecret, secretLen) {
    let shouldNextCharBeIncreased = true
    let index = 0
    while (shouldNextCharBeIncreased) {
        shouldNextCharBeIncreased = false
        if (genSecret[index] === 'z') {
            if (index + 1 === secretLen) {
                return genSecret
            }
            else {
                shouldNextCharBeIncreased = true
                let genScrtArr = [...genSecret]
                genScrtArr[index] = 'a'
                genSecret = genScrtArr.join('')
                index++
            }
        }
        else {
            let genScrtArr = [...genSecret]
            genScrtArr[index] = String.fromCharCode(genScrtArr[index].charCodeAt() + 1)
            genSecret = genScrtArr.join('')
            index = 0
        }
    }
    return genSecret
}

module.exports = {
    guessSecret,
    symmCipher
}