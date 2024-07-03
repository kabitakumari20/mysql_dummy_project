// let arr = [3, 6, 8, 9, 10, 13]

// function findSecondMax(arr) {
//     let max = 0
//     let secondMax = 0
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > max) {
//             secondMax = max
//             max = arr[i]

//         } else if (arr[i] > secondMax && arr[i] < max) {
//             secondMax = arr[i]

//         }
//     }
//     console.log(secondMax)
// }
// findSecondMax(arr)

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
})
