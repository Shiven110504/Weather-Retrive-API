import assert from "assert";
import { fetchUniversities } from "./fetchUniversities.js";

describe("fetchUniversities", () => {
  it("follows type specification", () => {
    const promise = fetchUniversities("University of Massachusetts at Amherst");

    return promise.then(result => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.every(x => typeof x === "string")); // Assert each element in the array is a string
    });
  });
});

describe("fetchUniversities 3", () => {
  it("follows type specification", () => {
    const promise = fetchUniversities("University of Massachusetts at Amherst");

    return promise.then(result => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.every(x => typeof x === "string")); // Assert each element in the array is a string
    });
  });

  it("returns length of the University Massachusetts", () => {
    return fetchUniversities("Massachusetts").then(result => assert(result.length === 6));
  });
});
