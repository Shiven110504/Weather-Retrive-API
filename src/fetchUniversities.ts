import fetch from "../include/fetch.js";

export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  const url = `http://220.maxkuechen.com/universities/search?name=${query}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch universities: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        return [];
      }
      return data.map(university => university.name);
    })
    .catch(error => {
      throw new Error(error);
    });
}
