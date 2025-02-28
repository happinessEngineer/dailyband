const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dialogue-no-tiny-chars-no-parens-no-short-long-fixed-names.json');
const characterFilePath = path.join(__dirname, './characters.json');

const jsonData = JSON.parse(fs.readFileSync(inputFilePath, 'utf-8'));
const characters = JSON.parse(fs.readFileSync(characterFilePath, 'utf-8'));
console.log(jsonData.length);
function getRandomLine() {
  const randomIndex = Math.floor(Math.random() * jsonData.length);
  return jsonData.splice(randomIndex, 1)[0];
  // return jsonData[randomIndex];
}

function randomSort(array) {
  return array.sort(() => Math.random() - 0.5);
}

function weightedRandomSelection(excludeNames = []) {
  // Filter out the excluded character
  const filteredCharacters = characters.filter(
    character => !excludeNames.includes(character.name)
  );

  // If all characters are excluded, throw an error
  if (filteredCharacters.length === 0) {
    throw new Error("No characters available after excluding the specified name");
  }

  // Create a cumulative weight array
  const cumulativeWeights = [];
  let totalWeight = 0;

  for (const character of filteredCharacters) {
    totalWeight += character.lines;
    cumulativeWeights.push(totalWeight);
  }

  // Generate a random number between 0 and the total weight
  const randomWeight = Math.random() * totalWeight;

  // Find the character corresponding to the random weight
  for (let i = 0; i < filteredCharacters.length; i++) {
    if (randomWeight < cumulativeWeights[i]) {
      return filteredCharacters[i].name;
    }
  }
}

// NEXT:
// get 3 weighted character names (excluding name from above)
// add name from above
// randomize sorting
// display dialogue and 4 choices


// console.log(items);
// console.log(randomizedChars);





function padNumber(number) {
    var string  = '' + number;
    string      = string.length < 2 ? '0' + string : string;
    return string;
}

function getNextDate(date) {
  let next_date = new Date(date.setDate(date.getDate() + 1));
  console.log(date.toString());
  if (date.toString() === 'Sun Mar 09 2025 19:00:00 GMT-0400 (Eastern Daylight Time)') {
    next_date = new Date('2025-03-10');
  } else if (date.toString() === 'Sun Mar 08 2026 19:00:00 GMT-0400 (Eastern Daylight Time)') {
    next_date = new Date('2026-03-09');
  } else if (date.toString() === 'Sun Mar 14 2027 19:00:00 GMT-0400 (Eastern Daylight Time)') {
    next_date = new Date('2027-03-15');
  }
  return next_date.getUTCFullYear() + '-' + padNumber(next_date.getUTCMonth() + 1) + '-' + padNumber(next_date.getUTCDate());
}

let day = new Date('2025-01-04');

for (let i = 3; i <= 1150; i++) {
  const nextDay = getNextDate(day);
  day = new Date(nextDay);

  const questions = [];

  for (let j = 0; j <10; j++) {
    const line = getRandomLine();
    const chars = [];
    chars.push(line.character);
    chars.push(weightedRandomSelection(chars));
    chars.push(weightedRandomSelection(chars));
    chars.push(weightedRandomSelection(chars));

    const randomizedChars = randomSort(chars);
    questions.push({
      quote: line.dialogue,
      characters: randomizedChars,
      correctAnswer: line.character,
    });
  }

  const game = {
    gameNumber: i,
    date: nextDay,
    questions,
  }

  const outputFilePath = path.join(__dirname, `../questions/${nextDay}-questions-and-answers.json`);
  fs.writeFileSync(outputFilePath, JSON.stringify(game, null, 2));
  console.log(nextDay);
}
console.log(jsonData.length);

