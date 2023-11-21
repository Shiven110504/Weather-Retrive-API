import fetch from "../include/fetch.js";

interface University {
  name: string;
}

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
    .then((data: University[]) => {
      if (!Array.isArray(data)) {
        return [];
      }
      return data.map(university => university.name);
    })
    .catch(error => {
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      throw new Error(errorMessage);
    });
}
