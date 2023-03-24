import "./App.css";

import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { TailSpin } from "react-loader-spinner";
import { useGetSolution } from "./Hooks/useGetSolution.js";
import Tile from "./Components/Tile";
import Text from "./Components/Text";

function App() {
  const [puzzle, setPuzzle] = useState([2, 8, 3, 1, 6, 4, 7, "", 5]);
  const [type, setType] = useState("Astar");
  const [heuristic, setHueristic] = useState("MD");
  const [speefOfAnimation, setSpeedOfAnimation] = useState(250);

  const [solutionWasFound, setSolutionWasFound] = useState(null);
  const [lengthOfSolution, setLengthOfSolution] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { handleSolution } = useGetSolution();

  const handleSolutionClick = async () => {
    setSolutionWasFound(null);
    setIsLoading(true);
    const solution = await handleSolution(puzzle, type, heuristic);
    setIsLoading(false);
    if (solution.solution_sequence !== "No solution") {
      setSolutionWasFound(true);
      setLengthOfSolution(solution.solution_sequence.length);
      animateSolution(solution.solution_sequence);
    } else {
      setSolutionWasFound(false);
    }
  };
  const animateSolution = (sol) => {
    console.log(sol);
    sol.map((value, index) => {
      setTimeout(() => {
        setPuzzle(value);
      }, index * speefOfAnimation);
    });
  };

  const shuffleArray = (array) => {
    setSolutionWasFound(null);
    const newArray = [...array];
    const compareRandom = () => Math.random() - 0.5;
    newArray.sort(compareRandom);
    return newArray;
  };

  const handleShuffle = () => {
    const shuffledNumbers = shuffleArray(puzzle);
    setPuzzle(shuffledNumbers);
  };

  useEffect(() => {
    document.title = "8-Puzzle Solver";
  }, []);

  return (
    <div className="App">
      <div className="header">
        <a href="https://github.com/markspooner1/8PuzzleVisualizer">
          <GitHubIcon />
        </a>
      </div>
      <Text />
      <form>
        <label>
          <h4>Select Search Algorithm</h4>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="Astar">Astar</option>
            <option value="BestFS">BestFS</option>
            <option value="BFS">Breadth First Search</option>
            <option value="DFS">Depth First Search</option>
          </select>
        </label>
        <label>
          <h4>Select Heuristic</h4>
          <select onChange={(e) => setHueristic(e.target.value)}>
            <option value="A1">Manhattan Distance + Linear Conflicts</option>
            <option value="MD">Manhattan Distance</option>
            <option value="PI">Permutation Inversions</option>
            <option value="HD">Hamming Distance</option>
          </select>
        </label>
      </form>
      <h3>
        Set the 8-puzzle by clicking on a box and changing its value <br /> (For
        the blank tile leave the input empty)
      </h3>
      <h4>set animation speed</h4>
      <select onChange={(e) => setSpeedOfAnimation(e.target.value)}>
        <option value={250}>1/4 Second</option>
        <option value={500}>1/2 Second </option>
        <option value={1000}>1 Second</option>
        <option value={2000}>2 Seconds</option>
      </select>
      {solutionWasFound === false && (
        <div className="res1">No Solution found after 3000 nodes vistited</div>
      )}
      {solutionWasFound === true && (
        <div className="res2">
          Solution found, length of solution path: {lengthOfSolution}
        </div>
      )}
      {isLoading && <h3>Searching for solution...</h3>}
      <div className="spinner">
        <TailSpin
          height="50"
          width="50"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={isLoading}
        />
      </div>
      <table>
        <tbody>
          {puzzle
            .reduce(
              (rows, _, index) =>
                index % 3 === 0
                  ? [...rows, puzzle.slice(index, index + 3)]
                  : rows,
              []
            )
            .map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <Tile
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    value={value}
                    setPuzzle={setPuzzle}
                  />
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <button type="submit" onClick={handleSolutionClick}>
        Solve
      </button>
      <button type="submit" onClick={handleShuffle}>
        Shuffle
      </button>
    </div>
  );
}

export default App;
