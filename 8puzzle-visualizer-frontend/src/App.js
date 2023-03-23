import "./App.css";
import puzzleinit from "./8puzzleinit.png"
import puzzlegoal from "./8puzzlegoal.png"
import React, { useState, useEffect } from "react";
function App() {
  const [puzzle, setPuzzle] = useState([2, 8, 3, 1, 6, 4, 7, "", 5]);
  const [type, setType] = useState("Astar");
  const [heuristic, setHueristic] = useState("MD");
  const [solutionWasFound, setSolutionWasFound] = useState(null);
  const [lengthOfSolution, setLengthOfSolution] = useState(null);
  const getSolution = async () => {
    console.log(puzzle)
    setSolutionWasFound(null);
    const response = await fetch("http://127.0.0.1:5000/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        crossDomain: true,
      },
      body: JSON.stringify({
        puzzle: puzzle,
        type: type,
        heuristic: heuristic,
      }),
    });
    const data = await response.json();
    if (data.solution_sequence !== "No solution") {
      animateSolution(data.solution_sequence);
      setLengthOfSolution(data.solution_sequence.length)
    }
    setSolutionWasFound(data.solution_sequence !== "No solution");
    //setSolution(response.solution_sequence)
  };
  const animateSolution = (sol) => {
    console.log("here")
    sol.map((value, index) => {
      setTimeout(() => {
        setPuzzle(value);
        console.log(value);
      }, index * 1200); 
    });
  }
  useEffect(() => {
  }, []);
  return (
    <div className="App">
      <h1>8 Puzzle Solver</h1>
      <div className = "container">
        <p>The 8-puzzle is a classic puzzle game that involves sliding tiles on a 3x3 grid to form a particular pattern or configuration. The game starts with 8 tiles arranged 
          in a random order on the grid, with one empty space. The goal of the game is to move the tiles around the grid by sliding them into the empty space, in order to arrange 
          them into a specific target configuration. Scroll down to interact with the 8-puzzle solver </p><br/><br/>
          <p><b>Given the puzzle:</b> </p>
        <div className="ImageContainer">
        <div className="image">
          <img src={puzzleinit} alt = "8puzzle" width={100}/>
        </div>
        <div className="ImageDescription"> the <b>goal state</b> is the following configuration: ---&gt;</div>
        <div className="image">
          <img src={puzzlegoal} alt = "8puzzle" width={100}/>
        </div>
        </div>
        <p>Using python I develop Informed and Uninformed Search algorithms to reach the goal state, utilizing different heuristics for A* and Best First Search.</p><br />
        <h4>Heuristics Used</h4>
        <ul className="background">
          <li><b>Manhattan Distance:</b> the sum of the distances of each tile from its goal position</li>
          <li><b>Manhattan Distance + Linear Conflicts:</b>  A linear conflict arises if 2 tiles are in each others target index and they must pass over each other in order to reach their final goal position</li>
          <li><b>Permutation Inversions:</b>  For each tile, count how many tiles on its right should be on its left in the goal state. </li>
          <li><b>Hamming Distance:</b>  count number of tiles out of place when compared with goal</li>
          
        </ul>
        </div>
      <form>
         <label>
          <h4>Select Search Algorithm</h4>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="Astar">Astar</option>
            <option value="BestFS">BestFS</option>
            <option value="DFS">Depth First Search</option>
            <option value="BFS">Breadth First Search </option>
          </select>
        </label>
        <label>
         <h4>Select Heuristic</h4>
          <select onChange={(e) => setHueristic(e.target.value)}>
            <option value="A1">Manhattan Distance + Linear Conflicts</option>
            <option value="MD">Manhattan Distance</option>
            <option value="PI">Permutation Inversions<b/></option>
            <option value="HD">Hamming Distance</option>
          </select>
        </label>
      </form>
      <h3>Set the 8-puzzle by clicking on a box and changing its value</h3>
      <p>For the blank tile leave the input empty</p>
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
                  <td key={colIndex}>
                    <input className="square"
                      maxLength={1}
                      value={value}
                      type={"text"}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        console.log(newValue)
                        setPuzzle((prevPuzzle) => {
                          const newPuzzle = [...prevPuzzle];
                          newPuzzle[rowIndex * 3 + colIndex] = newValue;
                          console.log(newPuzzle)
                          return newPuzzle;
                        });
                      }}
                      style={{ backgroundColor: value === "" ? "white" : "#DAF7A6" }}
                    />
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      <button type="submit" onClick={getSolution}>
          Solve
        </button>
        {solutionWasFound === false && <h5>No Solution found after 1000 nodes vistited</h5>}
        {solutionWasFound === true && <h5>Solution found, length of solution path: {lengthOfSolution}</h5>}

    </div>
  );
}

export default App;
