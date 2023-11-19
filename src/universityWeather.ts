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
  return new Promise(res => res({ totalAverage: NaN }));
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return new Promise(res => res({ totalAverage: NaN }));
}
