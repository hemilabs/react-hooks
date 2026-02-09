import { parseEther } from "viem/utils";
import { describe, expect, it } from "vitest";

import { estimateTotalFee } from "./fees";

// Base valid parameters for all tests
const validParameters = {
  baseFeePerGas: parseEther("10", "gwei"),
  fallbackPriorityFee: parseEther("1", "gwei"),
  gasUnits: 21000n,
  // note it's above fallbackPriorityFee
  maxPriorityFeePerGas: parseEther("2", "gwei"),
  overEstimation: 1.0,
};

describe("estimateTotalFee", function () {
  it("should use fallbackPriorityFee when priority fee is zero", function () {
    const result = estimateTotalFee({
      ...validParameters,
      maxPriorityFeePerGas: 0n,
    });
    // maxFeePerGas = (10 * 2) + 1 = 21 Gwei
    // total = 21000 * 21 Gwei = 441000 Gwei
    expect(result).toBe(parseEther("441000", "gwei"));
  });

  it("should use fallbackPriorityFee when priority fee is below fallbackPriorityFee", function () {
    const result = estimateTotalFee({
      ...validParameters,
      maxPriorityFeePerGas: validParameters.fallbackPriorityFee - 1n,
    });
    // maxFeePerGas = (10 * 2) + 1 = 21 Gwei (fallback used)
    // total = 21000 * 21 Gwei = 441000 Gwei
    expect(result).toBe(parseEther("441000", "gwei"));
  });

  it("should use actual priority fee when priority fee is above fallbackPriorityFee", function () {
    const result = estimateTotalFee(validParameters);
    // maxFeePerGas = (10 * 2) + 2 = 22 Gwei
    // total = 21000 * 22 Gwei = 462000 Gwei
    expect(result).toBe(parseEther("462000", "gwei"));
  });

  it("should use fallbackPriorityFee when priority fee is undefined on default chain", function () {
    const result = estimateTotalFee({
      ...validParameters,
      maxPriorityFeePerGas: undefined,
    });
    // maxFeePerGas = (10 * 2) + 1 = 21 Gwei (fallback used)
    // total = 21000 * 21 Gwei = 441000 Gwei
    expect(result).toBe(parseEther("441000", "gwei"));
  });

  it("should handle zero base fee correctly", function () {
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: 0n,
    });
    // maxFeePerGas = (0 * 2) + 2 = 2 Gwei
    expect(result).toBe(parseEther("42000", "gwei"));
  });

  it("should handle very large base fee correctly", function () {
    const largeBaseFee = 1000n * parseEther("1", "gwei"); // 1000 Gwei
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: largeBaseFee,
    });
    // maxFeePerGas = (1000 * 2) + 2 = 2002 Gwei
    expect(result).toBe(parseEther("42042000", "gwei"));
  });

  it("should apply default over-estimation of 1.5x", function () {
    const result = estimateTotalFee({
      ...validParameters,
      // overEstimation defaults to 1.5
      overEstimation: undefined,
    });
    // maxFeePerGas = (10 * 2) + 2 = 22 Gwei
    // total = 21000 * 22 Gwei * 1.5 = 693000 Gwei
    expect(result).toBe(parseEther("693000", "gwei"));
  });

  it("should apply no over-estimation when set to 1.0", function () {
    const result = estimateTotalFee(validParameters);
    // maxFeePerGas = (10 * 2) + 2 = 22 Gwei
    // total = 21000 * 22 Gwei * 1.0 = 462000 Gwei
    expect(result).toBe(parseEther("462000", "gwei"));
  });

  it("should apply 2.0x over-estimation", function () {
    const result = estimateTotalFee({
      ...validParameters,
      overEstimation: 2.0,
    });
    // maxFeePerGas = (10 * 2) + 2 = 22 Gwei
    // total = 21000 * 22 Gwei * 2.0 = 924000 Gwei
    expect(result).toBe(parseEther("924000", "gwei"));
  });

  it("should apply fractional over-estimation 1.25x correctly", function () {
    const result = estimateTotalFee({
      ...validParameters,
      overEstimation: 1.25,
    });
    // maxFeePerGas = (10 * 2) + 2 = 22 Gwei
    // total = 21000 * 22 Gwei * 1.25
    // = 462000 Gwei * 1.25 = 577500 Gwei
    expect(result).toBe(parseEther("577500", "gwei"));
  });

  it("should handle fractional over-estimation with proper rounding", function () {
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: parseEther("1", "gwei"),
      gasUnits: 1000n,
      maxPriorityFeePerGas: parseEther("1", "gwei"),
      overEstimation: 1.333, // Should round to 1333
    });
    // maxFeePerGas = (1 Gwei * 2) + 1 Gwei = 3 Gwei
    // total = 1000 * 3 Gwei * 1333 / 1000 = 3999 Gwei
    expect(result).toBe(parseEther("3999", "gwei"));
  });

  it("should return zero when gas units is zero", function () {
    const result = estimateTotalFee({
      ...validParameters,
      gasUnits: 0n,
    });
    expect(result).toBe(0n);
  });

  it("should return undefined when gas units is undefined", function () {
    const result = estimateTotalFee({
      ...validParameters,
      gasUnits: undefined,
    });
    expect(result).toBeUndefined();
  });

  it("should return undefined when base fee is undefined", function () {
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: undefined,
    });
    expect(result).toBeUndefined();
  });

  it("should handle large gas units correctly", function () {
    const largeGasUnits = 1000000n;
    const result = estimateTotalFee({
      ...validParameters,
      gasUnits: largeGasUnits,
    });
    // maxFeePerGas = (10 * 2) + 2 = 22 Gwei
    // total = 1000000 * 22 Gwei
    expect(result).toBe(parseEther("22000000", "gwei"));
  });

  it("should return zero when all parameters are zero", function () {
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: 0n,
      gasUnits: 0n,
      maxPriorityFeePerGas: 0n,
    });
    expect(result).toBe(0n);
  });

  it("should handle all minimum values with fallback correctly", function () {
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: 0n,
      gasUnits: 1n,
      maxPriorityFeePerGas: undefined,
    });
    // maxFeePerGas = (0 * 2) + 1 Gwei = 1 Gwei (fallback)
    // total = 1 * 1 Gwei = 1 Gwei
    expect(result).toBe(parseEther("1", "gwei"));
  });

  it("should preserve precision with large numbers and overestimation", function () {
    const result = estimateTotalFee({
      ...validParameters,
      baseFeePerGas: 100n * parseEther("1", "gwei"),
      gasUnits: 500000n,
      maxPriorityFeePerGas: 10n * parseEther("1", "gwei"),
      overEstimation: 1.75,
    });
    // maxFeePerGas = (100 * 2) + 10 = 210 Gwei
    // total = 500000 * 210 Gwei * 1.75
    // = 105000000 Gwei * 1.75 = 183750000 Gwei
    expect(result).toBe(parseEther("183750000", "gwei"));
  });

  it("should throw when overEstimation is negative", function () {
    expect(() =>
      estimateTotalFee({
        ...validParameters,
        overEstimation: -1,
      }),
    ).toThrow("overEstimation must be a positive finite number");
  });

  it("should throw when overEstimation is zero", function () {
    expect(() =>
      estimateTotalFee({
        ...validParameters,
        overEstimation: 0,
      }),
    ).toThrow("overEstimation must be a positive finite number");
  });

  it("should throw when overEstimation is NaN", function () {
    expect(() =>
      estimateTotalFee({
        ...validParameters,
        overEstimation: NaN,
      }),
    ).toThrow("overEstimation must be a positive finite number");
  });

  it("should throw when overEstimation is Infinity", function () {
    expect(() =>
      estimateTotalFee({
        ...validParameters,
        overEstimation: Infinity,
      }),
    ).toThrow("overEstimation must be a positive finite number");
  });

  it("should throw when overEstimation is negative Infinity", function () {
    expect(() =>
      estimateTotalFee({
        ...validParameters,
        overEstimation: -Infinity,
      }),
    ).toThrow("overEstimation must be a positive finite number");
  });

  it("should throw when overEstimation is not a number", function () {
    expect(() =>
      estimateTotalFee({
        ...validParameters,
        // @ts-expect-error - testing runtime behavior with invalid type
        overEstimation: "1.5",
      }),
    ).toThrow("overEstimation must be a positive finite number");
  });
});
