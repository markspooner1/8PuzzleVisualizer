import styles from "../styles/Puzzle.module.css";

const Tile = ({ rowIndex, colIndex, value, setPuzzle }) => {
  const tileClassName = `${styles.tile} ${
    value === "" ? styles.tileEmpty : styles.tileFilled
  }`;

  return (
    <td>
      <input
        className={tileClassName}
        maxLength={1}
        value={value}
        type="number"
        min={1}
        max={8}
        onChange={(e) => {
          const newValue = e.target.value;
          if (
            newValue === "" ||
            (parseInt(newValue) >= 1 && parseInt(newValue) <= 8)
          ) {
            setPuzzle((prevPuzzle) => {
              const newPuzzle = [...prevPuzzle];
              newPuzzle[rowIndex * 3 + colIndex] = newValue;
              return newPuzzle;
            });
          }
        }}
      />
    </td>
  );
};

export default Tile;
