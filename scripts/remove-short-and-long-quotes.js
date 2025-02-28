const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-no-tiny-chars-no-parens.json');
const outputFilePath = path.join(__dirname, './dialogue-no-tiny-chars-no-parens-no-short-long.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

const newData = [];

for (const item of jsonData) {
  if (item.dialogue.length > 60 && item.dialogue.length < 200 )
  newData.push({
    character: item.character,
    dialogue: item.dialogue,
  });
}

fs.writeFileSync(outputFilePath, JSON.stringify(newData, null, 2));
console.log('JSON file created successfully!');

