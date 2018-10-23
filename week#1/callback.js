'use strict';

const request = require('request');


function callApi(url, callback) {
    setTimeout(() => {
        // Error goes as a first parameter, always! This is a convention
        // used in all native Node.js modules.
        callback(null, `Result: ${url}`)
    }, 1000)
}
// This is callback hell
callApi('api.google.com', (err, data) => {
    console.log(data)
    callApi('api.microsoft.com', (innerErr, innerData) => {
        console.log(innerData)
        callApi('api.apple.com', (subErr, subData) => {
            console.log(`${data} ${subData}`)
        })
    })
})