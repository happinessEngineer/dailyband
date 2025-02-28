const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'all-dialogue.txt'); // Replace with the actual path to your text file
const outputFilePath = path.join(__dirname, './dialogue.json');

const dialogueRegex = /^([A-Z]+):\s*(.+)$/; // Matches lines like "JERRY: What's the deal..."

const jsonData = [];

const fileContent = fs.readFileSync(inputFilePath, 'utf-8');
const lines = fileContent.split('\n');

for (const line of lines) {
  const match = line.match(dialogueRegex);
  if (match) {
    const character = match[1];
    const dialogue = match[2];
    jsonData.push({ character, dialogue });
  }
}

fs.writeFileSync(outputFilePath, JSON.stringify(jsonData, null, 2));
console.log('JSON file created successfully!');