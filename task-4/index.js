const fs = require('fs');

function countGoodPositions(n, m, actors) {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < 4; k++) {
        let x = i, y = j;
        while (true) {
          switch (k) {
            case 0: y--; break; // left
            case 1: x--; break; // up
            case 2: y++; break; // right
            case 3: x++; break; // down
          }
          if (x < 0 || x >= n || y < 0 || y >= m) break; // out of bounds
          if (actors[x][y]) { // actor found
            count++;
            break;
          }
        }
      }
    }
  }
  return count;
}

// read input data from file
const inputData = fs.readFileSync('input.json');
const { n, m, actors } = JSON.parse(inputData);

// compute the result
const result = countGoodPositions(n, m, actors);

// write the result to file
const outputData = JSON.stringify({ result });
fs.writeFileSync('output.json', outputData);
