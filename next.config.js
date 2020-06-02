// next.config.js
require('dotenv').config();

//const env = process.env.NODE_ENV; // 'dev' or 'test'

module.exports = {
    serverRuntimeConfig: {
        ECHO_SERVICE_URL: process.env.ECHO_SERVICE_URL,
        ECHO_SERVICE_POST_ECHO: process.env.ECHO_SERVICE_POST_ECHO,
        ECHO_SERVICE_POST_REVERSE: process.env.ECHO_SERVICE_POST_REVERSE,
     },
  
    publicRuntimeConfig: {
//      ECHO_SERVICE_HOST: process.env.ECHO_SERVICE_HOST,
//      ECHO_SERVICE_PORT: process.env.ECHO_SERVICE_PORT,
//        ECHO_SERVICE_GET_PING: process.env.ECHO_SERVICE_GET_PING,
    }
  


/*    serverRuntimeConfig: { // Will only be available on the server side
        mysecret: 'the secret',
        k8secret: process.env.K8SECRET
    },

    publicRuntimeConfig: { // Will be available on both server and client
        myvar: 'myvar',
        TESTVAR: process.env.TESTVAR || 'dev Test Var',
        k8var: process.env.k8var,
        version: process.env.VERSION,
    }
    */
};