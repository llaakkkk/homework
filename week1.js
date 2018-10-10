'use strict';
const request = require('request');
const fetch = require('node-fetch');

//------------- Promise ----------------

function getRoutes(vehicle, callback) {
    request(vehicle, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            let result = JSON.parse(body);
            callback(null, result);
        } else {
            callback(error, null);
        }
    });

};

function loadUserData(url) {
    return fetch(url)
        .then(response => response.text());
}


function loadVehicles(userData) {
    console.log(userData);
    let vehicles = JSON.parse(userData).vehicles

    let vehiclesData = vehicles.map(vehicle => {
        // TODO how to get data to result to get vehicle name
        let result = getRoutes(vehicle, function (err, data) {
            if (err) console.log('error', err)//error handling
            console.log(data);

        })
        return vehicle;
    });
    return vehiclesData;
}

loadUserData('http://swapi.co/api/people/1')
    .then(userData => loadVehicles(userData))