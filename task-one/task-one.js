const fs = require('fs');

// Read input data from JSON file
let inputData = fs.readFileSync('task-one.json');
let { a, b } = JSON.parse(inputData);

// Determine if it's possible to convert one number to another
let possible = false;
while (b >= a) {
  if (b === a) {
    possible = true;
    break;
  } else if (b % 2 === 0) {
    b /= 2;
  } else if ((b - 1) % 10 === 0) {
    b = (b - 1) / 10;
  } else {
    break;
  }
}

// Write output data to JSON file
let outputData = { possible };
fs.writeFile('output.json', JSON.stringify(outputData), (err) => {
  if (err) throw err;
  console.log('Output data saved to output.json');
});
