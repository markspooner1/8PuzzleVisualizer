import "./App.css";
import React, { useState, useEffect } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { puzzles } from "./Helpers/helpers";
import { useGetSolution } from "./Hooks/useGetSolution.js";
import Explanation from "./Components/Explanation";
import Puzzle from "./Components/Puzzle";
import Controls from "./Components/Controls";
import StatusMessages from "./Components/StatusMessages";
import ActionButtons from "./Components/ActionButtons";

function App() {
  const [puzzle, setPuzzle] = useState([2, 8, 3, 1, 6, 4, 7, "", 5]);
  const [type, setType] = useState("Astar");
  const [heuristic, setHeuristic] = useState("MD");
  const [speedOfAnimation, setSpeedOfAnimation] = useState(250);
  const [solutionState, setSolutionState] = useState({
    wasFound: null,
    length: null,
    sequence: null,
    isLoading: null,
  });

  const { handleSolution } = useGetSolution();

  const handleSolutionClick = async () => {
    setSolutionState((prev) => ({ ...prev, wasFound: null, isLoading: true }));
    const solution = await handleSolution(puzzle, type, heuristic);

    if (solution.solution_sequence !== "No solution") {
      setSolutionState({
        wasFound: true,
        length: solution.solution_sequence.length,
        sequence: solution.solution_sequence,
        isLoading: false,
      });
      animateSolution(solution.solution_sequence);
    } else {
      setSolutionState({
        wasFound: false,
        length: null,
        sequence: puzzle,
        isLoading: false,
      });
    }
  };

  const animateSolution = (sequence) => {
    sequence.forEach((value, index) => {
      setTimeout(() => {
        setPuzzle(value);
      }, index * speedOfAnimation);
    });
  };

  const handleShuffle = () => {
    const randomIndex = Math.floor(Math.random() * puzzles.length);
    setPuzzle(puzzles[randomIndex]);
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

      <Controls
        type={type}
        setType={setType}
        heuristic={heuristic}
        setHeuristic={setHeuristic}
        speedOfAnimation={speedOfAnimation}
        setSpeedOfAnimation={setSpeedOfAnimation}
      />

      <div className="puzzle-section">
        <h3>
          Set the 8-puzzle by clicking on a box and changing its value
          <br />
          (For the blank tile leave the input empty)
        </h3>

        <StatusMessages solutionState={solutionState} />
        <Puzzle puzzle={puzzle} setPuzzle={setPuzzle} />
        <ActionButtons
          handleSolutionClick={handleSolutionClick}
          handleShuffle={handleShuffle}
          solutionState={solutionState}
          setPuzzle={setPuzzle}
        />
      </div>
    </div>
  );
}

export default App;
