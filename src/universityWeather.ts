import { fetchCurrentTemperature } from "./fetchCurrentTemperature";
import { fetchGeoCoord } from "./fetchGeoCoord";
import { fetchUniversities } from "./fetchUniversities";

interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  return fetchUniversities(universityQuery).then(universityNames => {
    if (universityNames.length === 0) throw new Error("No results found for query.");
    const transformedNames = transformName ? universityNames.map(transformName) : universityNames;
    const geoCoordPromises = transformedNames.map(name => fetchGeoCoord(name));
    return Promise.all(geoCoordPromises).then(geoCoords => {
      const temperaturePromises = geoCoords.map((coord, index) =>
        fetchCurrentTemperature(coord).then(temperature => {
          const averageTemp = temperature.temperature_2m.reduce((a, b) => a + b, 0) / temperature.temperature_2m.length;
          return {
            name: universityNames[index],
            averageTemp,
          };
        })
      );
      return Promise.all(temperaturePromises).then(temperatures => {
        let totalAverage = 0;
        const results: AverageTemperatureResults = { totalAverage: 0 };
        temperatures.forEach(temp => {
          totalAverage += temp.averageTemp;
          results[temp.name] = temp.averageTemp;
        });
        results.totalAverage = totalAverage / temperatures.length;
        return results;
      });
    });
  });
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of Massachusetts", (name: string) => name.replace(" at ", " "));
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of California");
}
