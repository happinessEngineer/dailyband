const fs = require('fs');
const path = require('path');

function splitFile(inputFilePath, outputDirectory, numParts = 10) {
  try {
    // Read the input file
    const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
    const totalLength = fileContent.length;

    // Calculate the size of each part
    const partSize = Math.ceil(totalLength / numParts);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory, { recursive: true });
    }

    // Split the file and write each part
    for (let i = 0; i < numParts; i++) {
      const start = i * partSize;
      const end = start + partSize;
      const partContent = fileContent.slice(start, end);

      // Create a new file for each part
      const outputFilePath = path.join(outputDirectory, `part_${i + 1}.txt`);
      fs.writeFileSync(outputFilePath, partContent, 'utf-8');
      console.log(`Created: ${outputFilePath}`);
    }

    console.log('File successfully split into parts!');
  } catch (error) {
    console.error('Error splitting the file:', error);
  }
}

// Usage
const inputFilePath = 'all-dialogue.txt'; // Replace with your input file path
const outputDirectory = './dialogue-parts'; // Replace with your desired output folder
splitFile(inputFilePath, outputDirectory);