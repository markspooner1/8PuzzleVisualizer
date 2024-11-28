export const searchTypes = [
  { value: "Astar", text: "Astar" },
  { value: "BestFS", text: "BestFS" },
  { value: "BFS", text: "Breadth First Search" },
  { value: "DFS", text: "Depth First Search" },
];
export const heuristicTypes = [
  { value: "A1", text: "Manhattan Distance + Linear Conflicts" },
  { value: "MD", text: "Manhattan Distance" },
  { value: "PI", text: "Permutation Inversions" },
  { value: "HD", text: "Hamming Distance" },
];

export const speedTypes = [
  { value: 250, text: "1/4 Second" },
  { value: 500, text: "1/2 Second" },
  { value: 1000, text: "1 Second" },
  { value: 2000, text: "2 Seconds" },
];
export const puzzles = [
  [1, "", 2, 3, 7, 5, 6, 4, 8],
  [1, 2, 3, 4, "", 8, 7, 5, 6],
  [1, 5, 8, 4, "", 6, 3, 2, 7],
  [2, 4, 8, 6, 1, 3, 5, "", 7],
  ["", 8, 6, 3, 7, 4, 2, 1, 5],
  [7, 2, "", 1, 4, 3, 5, 8, 6],
  [1, 4, 6, 8, 3, 2, "", 7, 5],
  [6, 8, 2, 1, 7, 3, 4, "", 5],
  [7, 8, 3, 1, "", 2, 4, 6, 5],
  [1, 2, "", 5, 7, 8, 3, 6, 4],
  [8, 2, 5, 7, 4, "", 1, 3, 6],
  [7, "", 6, 4, 8, 1, 2, 5, 3],
  [1, "", 2, 8, 5, 3, 4, 6, 7],
  [5, 7, 6, 1, 2, "", 8, 3, 4],
  [4, 3, 8, 6, 5, 2, "", 7, 1],
  ["", 7, 8, 2, 3, 1, 4, 6, 5],
  [8, "", 1, 3, 5, 2, 4, 7, 6],
  [7, 1, 3, "", 8, 4, 2, 6, 5],
  [2, 4, "", 5, 7, 8, 1, 3, 6],
  ["", 5, 8, 7, 1, 2, 4, 6, 3],
  [1, 3, 2, 7, 6, 8, 5, 4, ""],
  [3, 1, "", 8, 5, 7, 4, 2, 6],
];
