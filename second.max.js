// // let array = [3, 4, 5, 6, 8, 9, 10, 23]
// let array = [3, 4, 5, 6, 8, 9, 10, 23,12];

// array.sort((a, b) => b - a); // Sort the array in descending order
// let secondMax = array[1]; // Get the second element

// console.log(secondMax); // Output: 10

let array = [3, 4, 5, 6, 8, 9, 10, 23, 12];

let max = 0;
let secondMax = 0;

for (let i = 0; i < array.length; i++) {
    if (array[i] > max) {
        secondMax = max;
        max = array[i];
    } else if (array[i] > secondMax && array[i] < max) {
        secondMax = array[i];
    }
}

console.log(secondMax); 
