// next.config.js
require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'test'

module.exports = {
    serverRuntimeConfig: { // Will only be available on the server side
        mysecret: 'the secret',
        k8secret: process.env.K8SECRET
    },

    publicRuntimeConfig: { // Will be available on both server and client
        myvar: 'myvar',
        TESTVAR: process.env.TESTVAR || 'dev Test Var',
        k8var: process.env.k8var,
        version: process.env.VERSION,
    }
};