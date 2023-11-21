import { GeoCoord } from "./fetchGeoCoord.js";
import fetch from "../include/fetch.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

interface ApiResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  //Url containing the desire coordinates
  const link = `https://220.maxkuechen.com/currentTemperature/forecast?latitude=${coords.lat}&longitude=${coords.lon}&hourly=temperature_2m&temperature_unit=fahrenheit`;

  // Perform the fetch request
  return fetch(link)
    .then(data => {
      //Check if the data extracted from the api exists
      if (!data.ok) {
        throw new Error("Error getting temperature");
      }
      return data.json();
    })
    .then((data: ApiResponse) => {
      // Extract the data
      const temperatureReading: TemperatureReading = {
        time: data.hourly.time,
        temperature_2m: data.hourly.temperature_2m,
      };
      return temperatureReading;
    })
    .catch(error => {
      //catching errors
      console.log("Error fetching temperature,", error);
      throw error;
    });
}
