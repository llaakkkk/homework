// 'use strict';

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let json = JSON.parse(xhr.response);
            console.log(json)
            console.log(json.text());
        } else {
            console.log(xhr.statusText);
        }
    }

    xhr.onerror = function (error) {
        console.log(error);
    }

    xhr.send();
}

getData('http://swapi.co/api/people/1')

//
// function getData(url) {
//     return new Promise(function (resolve, reject) {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url);
//         xhr.onload = function () {
//             if (xhr.status === 200) {
//                 let json = JSON.parse(xhr.response);
//                 console.log(json)
//                 resolve(json.text());
//             } else {
//                 reject(xhr.statusText);
//             }
//         }
//
//         xhr.onerror = function (error) {
//             reject(error);
//         }
//
//         xhr.send();
//     })
// }
//
// let vehicleUrlList = [];
// let vehicles = [];
// let lukeSkywalker = 'http://swapi.co/api/people/1';
//
// function addVehicleToList(movie) {
//     vehicleUrlList.appendChild(movie)
// }
//
// function showVehicleName(vehicles) {
//     vehicles.map(
//         function callback(vehicle) {
//             console.log(vehicleResult.name);
//         });
// }
//
//
// getData(lukeSkywalker)
//     .then(response => {
//         console.log(response);
//         let user = JSON.parse(response);
//         return user;
//     })
//     .then(userData => {
//         userData.vehicles.forEach(
//         movie => addVehicleToList(movie))
//         return vehicleUrlList;
//     }).then(data => {
//        vehicles = data.forEach(
//             vehicle => getData(vehicle)
//         )
//         return vehicles;
//     }).then(vehicles => showVehicleName(vehicles)
//     ).catch(error => console.error(error));