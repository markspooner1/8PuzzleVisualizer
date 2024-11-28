import puzzleinit from "../8puzzleinit.png";
import puzzlegoal from "../8puzzlegoal.png";
const Text = () => {
  return (
    <>
      {" "}
      <h1>8 Puzzle Solver</h1>
      <div className="container">
        <p>
          The 8-puzzle is a classic puzzle game that involves sliding tiles on a
          3x3 grid to form a particular pattern or configuration. The game
          starts with 8 tiles arranged in a random order on the grid, with one
          empty space. The goal of the game is to move the tiles around the grid
          by sliding them into the empty space, in order to arrange them into a
          specific target configuration. Using python I developed informed and
          Uninformed Search algorithms to reach the goal state, utilizing
          different heuristics for A* and Best First Search. Scroll down to
          interact with the 8-puzzle solver
        </p>
        <p>
          <b>For Example, Given this puzzle:</b>{" "}
        </p>
        <div className="ImageContainer">
          <div className="div1">
            {" "}
            <img src={puzzleinit} alt="8puzzle" width={100} />{" "}
          </div>
          <div className="div2">
            {" "}
            the goal state is the following configuration:{" "}
          </div>
          <div className="div3">
            {" "}
            <img src={puzzlegoal} alt="8puzzle" width={100} />{" "}
          </div>
        </div>
        <div className="div4">
          <h4>Heuristics Used</h4>
          <ul>
            <li>
              <b>Manhattan Distance:</b> the sum of the distances of each tile
              from its goal position
            </li>
            <li>
              <b>Manhattan Distance + Linear Conflicts:</b> A linear conflict
              arises if 2 tiles are in each others target index and they must
              pass over each other in order to reach their final goal position
            </li>
            <li>
              <b>Permutation Inversions:</b> For each tile, count how many tiles
              on its right should be on its left in the goal state.{" "}
            </li>
            <li>
              <b>Hamming Distance:</b> count number of tiles out of place when
              compared with goal
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Text;
