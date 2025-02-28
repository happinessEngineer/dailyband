const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-excluding-tiny-characters.json');
const outputFilePath = path.join(__dirname, './dialogue-no-tiny-chars-no-parens.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

function removeParentheses(str) {
  return str.replace(/\([^)]*\)/g, '');
}

const dataWithoutParens = [];

for (const item of jsonData) {
  dataWithoutParens.push({
    character: item.character,
    dialogue: removeParentheses(item.dialogue).trim(),
  });
}

fs.writeFileSync(outputFilePath, JSON.stringify(dataWithoutParens, null, 2));
console.log('JSON file created successfully!');

