import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ActionButtons = ({
  handleSolutionClick,
  handleShuffle,
  solutionState,
  setPuzzle,
}) => {
  return (
    <div className="action-buttons">
      <button type="submit" onClick={handleSolutionClick}>
        Solve
      </button>
      <button type="submit" onClick={handleShuffle}>
        Shuffle
      </button>
      {solutionState.sequence !== null && (
        <RestartAltIcon onClick={() => setPuzzle(solutionState.sequence[0])} />
      )}
    </div>
  );
};

export default ActionButtons;
