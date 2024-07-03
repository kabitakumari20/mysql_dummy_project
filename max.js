// let array = [3, 4, 5, 6, 8, 9, 10, 23];

// let max = 0;

// for (let i = 0; i < array.length; i++) {
//     if (array[i] > max) {
//         max = array[i];
//     }
// }

// console.log(max); // Output: 23



let string = "manvikabita";

let charCount = {};

for (let char of string) {
    // console.log("===c",char)
    if (charCount[char]) {
        charCount[char]++;
    } else {
        charCount[char] = 1;
    }
}

console.log(charCount);
// Output: { m: 1, a: 3, n: 1, v: 1, i: 2, k: 1, b: 1, t: 1 }
