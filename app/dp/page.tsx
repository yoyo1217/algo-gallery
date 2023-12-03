"use client";

import { knapsack } from "@/utils/knapsack";
import classNames from "classnames";
import React, { useState } from "react";

const DP = () => {
  const weightLimit = 9;
  const [weights, setWeights] = useState<number[]>([2, 1, 3, 2, 1, 5]);
  const [values, setValues] = useState<number[]>([3, 2, 6, 1, 3, 85]);
  const [weight, setWeight] = useState<number | "">(5);
  const [value, setValue] = useState<number | "">(5);
  const numOfItem = weights.length;

  const sum = weights.reduce((acc, curr) => acc + curr, 0);
  const dp = knapsack(numOfItem, weightLimit, { weights, values });
  const ans = dp[numOfItem][weightLimit];

  const addRow = () => {
    if (typeof weight === "number" && typeof value === "number") {
      setWeights([...weights, weight]);
      setValues([...values, value]);
    }
  };

  const isValidNumber = (value: number | "") => {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    isNaN(newValue) ? setWeight("") : setWeight(newValue);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    isNaN(newValue) ? setValue("") : setValue(newValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl pt-4">DP</h2>
      <div className="flex items-center py-2 space-x-2">
        <button
          onClick={addRow}
          className={classNames(
            "p-2 bg-green-600 text-white rounded hover:bg-green-800",
            {
              "opacity-50 cursor-not-allowed":
                !isValidNumber(weight) || !isValidNumber(value),
            }
          )}
          disabled={!isValidNumber(weight) || !isValidNumber(value)}
        >
          Add Item
        </button>
        <div className="flex items-center space-x-2">
          <label htmlFor="weight">
            Weight
            <input
              className={`border ${
                isValidNumber(weight)
                  ? "outline-green-600 border-green-600"
                  : "outline-red-600 border-red-600"
              }`}
              type="number"
              value={weight}
              onChange={handleWeightChange}
              onFocus={handleFocus}
            />
          </label>
          <label htmlFor="value">
            Value
            <input
              // className="border border-green-600"
              className={`border ${
                isValidNumber(value)
                  ? "outline-green-600 border-green-600"
                  : "outline-red-600 border-red-600"
              }`}
              type="number"
              value={value}
              onChange={handleValueChange}
              onFocus={handleFocus}
            />
          </label>
          <p
            className={`text-red-600 ${
              !isValidNumber(weight) || !isValidNumber(value) ? "" : "invisible"
            }`}
          >
            Number must be positive integer.
          </p>
        </div>
      </div>
      <div className="flex flex-row space-x-4">
        <table className="table-auto border-collapse border border-green-800 shadow-lg">
          <thead>
            <tr>
              <th className="border border-green-600 px-4 py-2 text-green-600">
                Weight
              </th>
              <th className="border border-green-600 px-4 py-2 text-green-600">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {weights.map((item, index) => (
              <tr key={index}>
                <td className="border border-green-600 px-4 py-2">{item}</td>
                <td className="border border-green-600 px-4 py-2">
                  {values[index]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table-auto border-collapse border border-green-800 shadow-lg">
          <thead>
            <tr>
              <th className="border border-green-600 px-4 py-2 text-green-600">
                i / w
              </th>
              {Array.from({ length: sum + 1 }, (_, i) => i).map(
                (item, index) => (
                  <th
                    key={index}
                    className="border border-green-600 px-4 py-2 text-green-600"
                  >
                    {item}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfItem + 1 }, (_, i) => i).map(
              (item, index) => (
                <tr key={index}>
                  <td className="border border-green-600 px-4 py-2">{item}</td>
                  {dp[item].map((_, i) => (
                    <td key={i} className="border border-green-600 px-4 py-2">
                      {dp[item][i]}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div>ans: {ans}</div>
    </div>
  );
};

export default DP;
