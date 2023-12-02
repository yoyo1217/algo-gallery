"use client";

interface Item {
  weight: number[];
  value: number[];
}

function knapsack(n: number, w: number, item: Item) {
  const dp: number[][] = Array.from({ length: 15 }, () =>
    new Array(15).fill(0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= w; j++) {
      if (j >= item.weight[i]) {
        dp[i + 1][j] = Math.max(
          dp[i][j],
          dp[i][j - item.weight[i]] + item.value[i]
        );
      } else {
        dp[i + 1][j] = dp[i][j];
      }
    }
  }
  console.log(dp);

  return dp[n][w];
}

const DP = () => {
  const weight = [2, 1, 3, 2, 1, 5];
  const value = [3, 2, 6, 1, 3, 85];
  const ans = knapsack(6, 9, { weight, value });

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-xl pt-4">DP</h2>
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
          {weight.map((weight, index) => (
            <tr key={index}>
              <td className="border border-green-600 px-4 py-2">{weight}</td>
              <td className="border border-green-600 px-4 py-2">
                {value[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>ans: {ans}</div>
    </div>
  );
};

export default DP;
