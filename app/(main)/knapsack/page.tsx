"use client";

import Editor from "@/components/Editor";
import { knapsack } from "@/utils/knapsack";
import classNames from "classnames";
import React, { useState } from "react";
import Table from "./_components/Table";
import Input from "./_components/Input";
import ValidationMessage from "./_components/ValidationMessage";
import Button from "./_components/Button";
import LeftHeaderTable from "./_components/LeftHeaderTable";

const Knapsack = () => {
  const [weightLimit, setWeightLimit] = useState<number | "">(9);
  const [weights, setWeights] = useState<number[]>([2, 1, 3, 2, 1, 5]);
  const [values, setValues] = useState<number[]>([3, 2, 6, 1, 3, 85]);
  const [weight, setWeight] = useState<number | "">(6);
  const [value, setValue] = useState<number | "">(5);
  const numOfItem = weights.length;

  const sum = weights.reduce((acc, curr) => acc + curr, 0);
  const dp = knapsack(numOfItem, { weights, values });
  const maximumWeight = dp[numOfItem][weightLimit as number];

  const addRow = () => {
    if (typeof weight === "number" && typeof value === "number") {
      setWeights([...weights, weight]);
      setValues([...values, value]);
    }
  };

  const removeRow = () => {
    if (typeof weight === "number" && typeof value === "number") {
      setWeights(weights.slice(0, weights.length - 1));
      setValues(values.slice(0, values.length - 1));
    }
  };

  const isValidNumber = (value: number | "") => {
    return (
      typeof value === "number" &&
      Number.isInteger(value) &&
      value > 0 &&
      value < 100
    );
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    isNaN(newValue) ? setWeight("") : setWeight(newValue);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    isNaN(newValue) ? setValue("") : setValue(newValue);
  };

  const handleWeightLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    isNaN(newValue) ? setWeightLimit("") : setWeightLimit(newValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const itemTableHeaders = ["Weight", "Value"];
  const create2DArray = () => {
    return weights.map((weight, index) => {
      const value = values[index];
      return [weight, value];
    });
  };

  const twoDimensionalArray = create2DArray();

  const dpTableHeaders = [
    "i/w",
    ...Array.from({ length: sum + 1 }, (_, i) => i.toString()),
  ];
  const dpTableData = Array.from({ length: numOfItem + 1 }, (_, i) => [
    i,
    ...dp[i],
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl font-bold pt-4">DP Table</h2>
      <ValidationMessage
        isVisible={
          !isValidNumber(weight) ||
          !isValidNumber(value) ||
          !isValidNumber(weightLimit)
        }
        message="Number must be between 1 and 99."
      />
      <div className="flex flex-col space-y-3">
        <div className="flex items-center py-2 space-x-2">
          <Button
            onClick={addRow}
            className={classNames("bg-green-600 hover:bg-green-800", {
              "opacity-50 cursor-not-allowed":
                !isValidNumber(weight) || !isValidNumber(value),
            })}
            disabled={!isValidNumber(weight) || !isValidNumber(value)}
            text="Add Item"
          />
          <div className="flex flex-col sm:flex-row items-center space-x-2">
            <label className="py-2" htmlFor="weight">
              Weight
            </label>
            <Input
              id="weight"
              outlineColor={isValidNumber(weight) ? "green-600" : "red-600"}
              value={weight}
              onChange={handleWeightChange}
              maxValue={9999}
              onFocus={handleFocus}
            />
            <label htmlFor="value">Value</label>
            <Input
              id="value"
              outlineColor={isValidNumber(value) ? "green-600" : "red-600"}
              value={value}
              onChange={handleValueChange}
              maxValue={9999}
              onFocus={handleFocus}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={removeRow}
            className={`bg-red-600 hover:bg-red-800 ${
              weights.length === 1 && "opacity-50 cursor-not-allowed"
            }`}
            disabled={weights.length === 1}
            text="Remove Row"
          />
          <div className="sm:flex sm:flex-row">
            <label htmlFor="weightLimit">Weight Limit</label>
            <Input
              id="weightLimit"
              outlineColor={
                isValidNumber(weightLimit) ? "green-600" : "red-600"
              }
              value={weightLimit}
              onChange={handleWeightLimitChange}
              maxValue={9999}
              onFocus={handleFocus}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-[90%]  space-y-4">
        <div className="min-w-[20%] md:min-w-[15%] max-h-[20rem] overflow-y-auto">
          <LeftHeaderTable
            headers={itemTableHeaders}
            data={twoDimensionalArray}
          />
        </div>
        <div className=" max-h-[20rem]  overflow-auto overflow-y-auto">
          <Table
            headers={dpTableHeaders}
            data={dpTableData}
            highlightCell={{ row: numOfItem, column: weightLimit as number }}
          />
        </div>
      </div>
      {maximumWeight !== undefined ? (
        <div className="text-md sm:text-lg font-bold">
          Maximum value: {maximumWeight} at weight limit: {weightLimit}
        </div>
      ) : (
        <div className="text-lg font-bold">not found</div>
      )}
      <div className="w-full py-4">
        <Editor />
      </div>
    </div>
  );
};

export default Knapsack;
