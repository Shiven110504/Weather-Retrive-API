import assert from "assert";
import { fetchUCalWeather, fetchUMassWeather, fetchUniversityWeather } from "./universityWeather.js";

// 1000ms
const SECOND = 1000;
// 30 second timeout
jest.setTimeout(30 * SECOND);

describe("fetchUCalWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });
});

describe("fetchUMassWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
    });
  });
});

describe("fetchUniversityWeather", () => {
  it("should return the correct values for a University of Washington,", () => {
    const promise = fetchUniversityWeather("University of Washington");
    return promise.then(result => {
      assert(typeof result.totalAverage === "number");
      const newArr = Object.keys(result).filter(x => x.includes("totalAverage"));
      assert(newArr.every(x => typeof x === "string"));
      assert(newArr.every(x => typeof result[x] === "number"));
    });
  });
});
it("should reject with error given invalid input", async () => {
  await expect(fetchUniversityWeather("InvalidQuery")).rejects.toThrow("No results found for query.");
});

describe("fetchUniversityWeather 3", () => {
  it("returns an error when entered an empty query", () => {
    return expect(fetchUniversityWeather("No results found for query.")).rejects.toThrow();
  });

  it("One university", () => {
    const promise = fetchUniversityWeather("University of Hartford");

    return promise.then(result => {
      expect(result.totalAverage).toEqual(result[`University of Hartford`]);
    });
  });

  it("University of Texas", async () => {
    const promise = await fetchUniversityWeather("University of Texas");

    expect(promise).toHaveProperty("totalAverage");
    expect(typeof promise.totalAverage).toBe("number");

    const resultKeys = new Set(Object.keys(promise).filter(key => key !== "totalAverage"));

    const expectedUniversities = new Set([
      "University of Texas Medical Branch",
      "University of Texas Permian Basin",
      "University of Texas Southwestern Medical Center",
      "University of Texas at Dallas",
      "University of Texas at Tyler",
      "University of Texas at El Paso",
      "University of Texas at Arlington",
    ]);

    const isSetsEqual = (a: Set<string>, b: Set<string>) => {
      return a.size === b.size && [...a].every(value => b.has(value));
    };

    expect(isSetsEqual(expectedUniversities, resultKeys)).toBe(true);

    expectedUniversities.forEach(uni => {
      expect(typeof promise[uni]).toBe("number");
    });
  });
});
