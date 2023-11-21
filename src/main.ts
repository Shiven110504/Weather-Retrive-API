import fetch from "../include/fetch.js";

/*
This program uses the Number Facts API and the RandomCat API to fetch number facts and random cat pictures.
It takes user input for the number of number facts && number of random cat pictures to dispay.
*/
async function fetchNumberFacts(numFacts: number): Promise<string[]> {
  const numberFacts: string[] = [];
  
  while (numFacts !== 0) {
    const response = await fetch(`http://numbersapi.com/${numFacts}`);
    if (!response.ok) {
      throw new Error(`HTTP error!!! status: ${response.status}`);
    }
    const data = await response.text();
    numberFacts.push(data);
    numFacts--;
  }
  return numberFacts;
}
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function fetchRandomCatPictures(numPictures: number): Promise<string[]> {
  const catPictures: string[] = [];
  const response = await fetch(`https://aws.random.cat/meow?count=${numPictures}`);
  const data = await response.json();

  for (const picture of data) {
    catPictures.push(picture.file);
  }
  return catPictures;
}
function getUserInput(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, (input: string) => {
      resolve(input);
    });
  });
}
(async function main() {
  const numCatFactsInput = await getUserInput("Enter the number of number facts to fetch: ");
  const numCatPicturesInput = await getUserInput("Enter the number of random cat pictures to fetch: ");

  rl.close();

  const numCatFacts = numCatFactsInput !== null ? parseInt(numCatFactsInput) : 0;
  const numCatPictures = numCatPicturesInput !== null ? parseInt(numCatPicturesInput) : 0;

  const catFacts = await fetchNumberFacts(numCatFacts);
  const averageFactLength = catFacts.reduce((sum, fact) => sum + fact.length, 0) / numCatFacts;

  console.log(`Number Facts:\n${catFacts.join("\n")}`);
  console.log(`\nAverage Fact Length: ${averageFactLength.toFixed(2)} characters\n`);

  const catPictures = await fetchRandomCatPictures(numCatPictures);
  console.log("\nRandom Cat Pictures:");
  catPictures.forEach((picture, index) => console.log(`${index + 1}. ${picture}`));
})();
