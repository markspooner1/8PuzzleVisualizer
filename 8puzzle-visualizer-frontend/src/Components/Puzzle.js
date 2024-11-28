import styles from "../styles/Puzzle.module.css";
import Tile from "./Tile";

const Puzzle = ({ puzzle, setPuzzle }) => {
  return (
    <table className={styles.puzzleGrid}>
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
                  key={`${rowIndex}-${colIndex}`}
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
  );
};

export default Puzzle;
