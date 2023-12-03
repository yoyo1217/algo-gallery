interface Item {
  weights: number[];
  values: number[];
}

export function knapsack(n: number, w: number, item: Item) {
  const weightSum = item.weights.reduce((acc, curr) => acc + curr, 0);
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(weightSum + 1).fill(0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= weightSum; j++) {
      if (j >= item.weights[i]) {
        dp[i + 1][j] = Math.max(
          dp[i][j],
          dp[i][j - item.weights[i]] + item.values[i]
        );
      } else {
        dp[i + 1][j] = dp[i][j];
      }
    }
  }
  return dp;
}
