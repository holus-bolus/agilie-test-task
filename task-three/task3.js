const fs = require('fs');

// read input data from JSON file
const inputData = JSON.parse(fs.readFileSync('input.json'));

const barWeight = 20; // kg
const maxLoadersPerSide = 12;
const lbToKg = 0.453592; // conversion factor from pounds to kilograms

// convert American wheel loaders to kilograms
const lbsToKg = (lbs) => lbs * lbToKg;
const americanLoaders = inputData.americanLoaders.map(lbsToKg);

// calculate all possible combinations of disc loaders
const allCombinations = (loaders) => {
  if (loaders.length === 0) {
    return [[]];
  } else {
    const rest = allCombinations(loaders.slice(1));
    return rest.concat(rest.map((x) => [loaders[0], ...x]));
  }
};
const discLoaders = inputData.discLoaders;
const kgLoaders = discLoaders.map((x) => x.weight);
const allDiscCombinations = allCombinations(kgLoaders).map((x) =>
  x.filter((a, i) => x.indexOf(a) === i) // remove duplicates
);

// filter out combinations that exceed the maximum number of loaders per side
const validDiscCombinations = allDiscCombinations.filter(
  (x) => x.length <= maxLoadersPerSide
);

// calculate total weight for each valid combination
const totalWeights = validDiscCombinations.map((x) =>
  x.reduce((a, b) => a + b, 0)
);

// add bar weight to each total weight
const weightsWithBar = totalWeights.map((x) => x + barWeight);

// find the smallest weight that exceeds the current record
const currentRecord = inputData.currentRecord;
const nextWeight = Math.min(
  ...weightsWithBar.filter((x) => x > currentRecord)
);

// find the corresponding disc combination
const index = weightsWithBar.indexOf(nextWeight);
const nextDiscCombination = validDiscCombinations[index];

// convert back to pounds if necessary
const kgToLbs = (kg) => kg / lbToKg;
const nextDiscCombinationLbs = nextDiscCombination.map(
  (kg) =>
    americanLoaders.find(
      (lbs) => Math.abs(lbsToKg(lbs) - kg) < Number.EPSILON
    ) || kgToLbs(kg)
);

// write output data to JSON file
const outputData = { nextWeight, nextDiscCombination: nextDiscCombinationLbs };
fs.writeFileSync('output.json', JSON.stringify(outputData));
``
