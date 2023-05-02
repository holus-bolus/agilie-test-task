const fs = require("fs");

function findTshirtSizes(tshirtCounts, participantSizes) {
  // Create a map to keep track of how many T-shirts we have for each size
  const tshirtMap = new Map(Object.entries(tshirtCounts));

  // Loop through each participant's preferred sizes
  for (let i = 0; i < participantSizes.length; i++) {
    const preferredSizes = participantSizes[i];

    // Check if the participant only specified one size
    if (preferredSizes.length === 1) {
      // If we have at least one T-shirt in the required size, use it for the participant
      if (tshirtMap.get(preferredSizes[0]) > 0) {
        tshirtMap.set(preferredSizes[0], tshirtMap.get(preferredSizes[0]) - 1);
      } else {
        // If we don't have a T-shirt in the required size, we can't fulfill the order
        return { success: false, message: `Cannot fulfill order for participant ${i+1}` };
      }
    } else if (preferredSizes.length === 2) {
      // Check if the participant specified two adjacent sizes
      const sizeIndex1 = tshirtSizes.indexOf(preferredSizes[0]);
      const sizeIndex2 = tshirtSizes.indexOf(preferredSizes[1]);

      if (Math.abs(sizeIndex1 - sizeIndex2) === 1) {
        // If the participant specified two adjacent sizes, use any available T-shirt in those sizes
        const size1 = preferredSizes[0];
        const size2 = preferredSizes[1];

        if (tshirtMap.get(size1) > 0) {
          tshirtMap.set(size1, tshirtMap.get(size1) - 1);
        } else if (tshirtMap.get(size2) > 0) {
          tshirtMap.set(size2, tshirtMap.get(size2) - 1);
        } else {
          // If we don't have any T-shirts in the specified sizes, we can't fulfill the order
          return { success: false, message: `Cannot fulfill order for participant ${i+1}` };
        }
      } else {
        // If the participant specified two non-adjacent sizes, we can't fulfill the order
        return { success: false, message: `Cannot fulfill order for participant ${i+1}` };
      }
    } else {
      // If the participant specified more than two sizes, we can't fulfill the order
      return { success: false, message: `Cannot fulfill order for participant ${i+1}` };
    }
  }

  // If we made it this far, we have enough T-shirts for all participants
  return { success: true, message: "All participants will receive a T-shirt!" };
}

// Read input data from JSON file
const inputData = JSON.parse(fs.readFileSync("input.json"));

const tshirtSizes = inputData.tshirtSizes;
const tshirtCounts = inputData.tshirtCounts;
const participantSizes = inputData.participantSizes;

// Call the function to find T-shirt sizes
const result = findTshirtSizes(tshirtCounts, participantSizes);

// Write output data to JSON file
fs.writeFileSync("output.json", JSON.stringify(result));
