const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-no-tiny-chars-no-parens-no-short-long.json');
const outputFilePath = path.join(__dirname, './dialogue-no-tiny-chars-no-parens-no-short-long-fixed-names.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const newData = [];

for (const item of jsonData) {
  newData.push({
    character: capitalizeFirstLetter(item.character),
    dialogue: item.dialogue,
  });
}

fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2));
console.log('JSON file created successfully!');

