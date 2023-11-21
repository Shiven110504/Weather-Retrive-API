import fetch from "../include/fetch.js";
import readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
This program uses the Number Facts API and the RandomYear API to fetch number facts and random year facts.
It takes user input for the number of number facts && number of year facts to dispay.
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

async function fetchYearFacts(numFacts: number): Promise<string[]> {
  const yearFacts: string[] = [];
  while (numFacts !== 0) {
    const response = await fetch(`http://numbersapi.com/random/year`);
    if (!response.ok) {
      throw new Error(`HTTP error!!! status: ${response.status}`);
    }
    const data = await response.text();
    yearFacts.push(data);
    numFacts--;
  }
  return yearFacts;
}
function getUserInput(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, (input: string) => {
      resolve(input);
    });
  });
}
(async function main() {
  const numNumberFactsInput = await getUserInput("Enter the number of number Facts to fetch: ");
  const numYearFactsInput = await getUserInput("Enter the number of year Facts to fetch: ");

  rl.close();

  const numNumberFacts = numNumberFactsInput !== null ? parseInt(numNumberFactsInput) : 0;
  const numYearFacts = numYearFactsInput !== null ? parseInt(numYearFactsInput) : 0;

  const NumberFacts = await fetchNumberFacts(numNumberFacts);
  const averageNumLength = NumberFacts.reduce((sum, fact) => sum + fact.length, 0) / numNumberFacts;

  console.log(`Number Facts:\n${NumberFacts.join("\n")}`);
  console.log(`\nAverage Fact Length: ${averageNumLength.toFixed(2)} characters\n`);

  const YearFacts = await fetchYearFacts(numYearFacts);
  const averageYearLength = YearFacts.reduce((sum, fact) => sum + fact.length, 0) / numYearFacts;

  console.log(`Year Facts:\n${YearFacts.join("\n")}`);
  console.log(`\nAverage Fact Length: ${averageYearLength.toFixed(2)} characters\n`);
})();
