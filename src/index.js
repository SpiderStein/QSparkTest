/**
 * @param {number[]} input 
 * @param {string} secret
 */
function symmCipher(input, secret) {
    const asciiEncodedScrt = []
    for (const char of secret) {
        asciiEncodedScrt.push(char.charCodeAt())
    }
    input = [...input]
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i] ^ (asciiEncodedScrt[i % asciiEncodedScrt.length])
    }
    return input
}