const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-no-tiny-chars-no-parens-no-short-long-fixed-names.json');
const outputFilePath = path.join(__dirname, './characters.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));

const characterCounts = {};
const characterJson = [];

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

for (const item of jsonData) {
	const character = item.character;
	characterCounts[character] = (characterCounts[character] || 0) + 1;
}

// Sort characters by line count (descending)
const sortedCharacters = Object.entries(characterCounts)
	.sort(([, countA], [, countB]) => countB - countA);

for (const [name, lines] of sortedCharacters) {
	characterJson.push({
		name: capitalizeFirstLetter(name),
		lines,
	});
}
// for (const [character, count] of sortedCharacters) {
// 	if (count < 11) {
// 		console.log(`${character},`);
// 	}
// }

// for (const item of jsonData) {
//   if (item.dialogue.length > 60 && item.dialogue.length < 200 )
//   newData.push({
//     character: item.character,
//     dialogue: item.dialogue,
//   });
// }

fs.writeFileSync(outputFilePath, JSON.stringify(characterJson, null, 2));
console.log('JSON file created successfully!');