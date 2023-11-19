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
  // TODO
  return new Promise(res => res({ totalAverage: NaN }));
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of Massachusetts", (name: string) => name.replace(" at ", " "));
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of California");
}
