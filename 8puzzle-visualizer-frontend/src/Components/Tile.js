const Tile = ({ rowIndex, colIndex, value, setPuzzle }) => {
  return (
    <td key={colIndex}>
      <input
        className="square"
        maxLength={1}
        value={value}
        type={"text"}
        onChange={(e) => {
          const newValue = e.target.value;
          setPuzzle((prevPuzzle) => {
            const newPuzzle = [...prevPuzzle];
            newPuzzle[rowIndex * 3 + colIndex] = newValue;
            return newPuzzle;
          });
        }}
        style={{
          backgroundColor: value === "" ? "white" : "#DAF7A6",
        }}
      />
    </td>
  );
};

export default Tile;
