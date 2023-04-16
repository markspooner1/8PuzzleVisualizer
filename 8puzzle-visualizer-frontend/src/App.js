import "./App.css";

import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { TailSpin } from "react-loader-spinner";
import { searchTypes, heuristicTypes, speedTypes } from "./Helpers/helpers";
import { useGetSolution } from "./Hooks/useGetSolution.js";
import Explanation from "./Components/Explanation";
import Puzzle from "./Components/Puzzle";

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
      <Explanation />
      <h4>Select Search Algorithm</h4>
      <select onChange={(e) => setType(e.target.value)}>
        {searchTypes.map((type) => (
          <option value={type.value}>{type.text}</option>
        ))}
      </select>
      {(type === "Astar" || type == "BestFS") && (
        <>
          <h4>Select Heuristic</h4>
          <select onChange={(e) => setHueristic(e.target.value)}>
            {heuristicTypes.map((type) => (
              <option value={type.value}>{type.text}</option>
            ))}
          </select>
        </>
      )}
      <h4>set animation speed</h4>
      <select onChange={(e) => setSpeedOfAnimation(e.target.value)}>
        {speedTypes.map((type) => (
          <option value={type.value}>{type.text}</option>
        ))}
      </select>

      <h3>
        Set the 8-puzzle by clicking on a box and changing its value <br /> (For
        the blank tile leave the input empty)
      </h3>

      {solutionWasFound === false && (
        <div className="res1">No Solution found after 1500 nodes vistited</div>
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
      <Puzzle puzzle={puzzle} setPuzzle={setPuzzle} />
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
