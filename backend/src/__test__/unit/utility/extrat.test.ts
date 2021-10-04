import { extractOptions } from "src/utility/extract";

import mockOptions from "src/__test__/data/mockOptions.json";
describe("utility extractOptions", () => {
  it("should return options", () => {
    const result = extractOptions(1);
    expect(result).toStrictEqual(mockOptions);
  });
  it("should return null when matched product doesnt exist", () => {
    const result = extractOptions(-1);
    expect(result).toStrictEqual(null);
  });
});
