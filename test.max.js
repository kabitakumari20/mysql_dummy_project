let arr = [7, 100, 200, 4, 5, 8]
let max = 0
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
        max = arr[i]
    }
}
console.log(max)



let max1 = 0
let secondMax = 0
for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max1) {
        secondMax = max1
        max1 = arr[i]
    } else if (arr[i] > secondMax && arr[i] < max) {
        secondMax = arr[i]
    }
}
console.log("se=======>>", secondMax)



let str = "manvikabita";

let charCount = {}

for (let i of str) {
    if (charCount[i]) {
        charCount[i]++;
    } else {
        charCount[i] = 1
    }
}
console.log(charCount)