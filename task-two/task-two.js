const fs = require('fs');

// Input data
let arr = [1, 3, 4, 2, 2];

// Write input data to JSON file
fs.writeFile('input.json', JSON.stringify(arr), (err) => {
  if (err) throw err;
  console.log('Input data saved to input.json');
});

// Find repeating element
let slow = arr[0];
let fast = arr[arr[0]];
while (slow !== fast) {
  slow = arr[slow];
  fast = arr[arr[fast]];
}
let ptr1 = arr[0];
let ptr2 = slow;
while (ptr1 !== ptr2) {
  ptr1 = arr[ptr1];
  ptr2 = arr[ptr2];
}
let repeatingElement = ptr1;

// Output data
let output = { repeatingElement };

// Write output data to JSON file
fs.writeFile('output.json', JSON.stringify(output), (err) => {
  if (err) throw err;
  console.log('Output data saved to output.json');
});
