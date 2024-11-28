import { TailSpin } from "react-loader-spinner";

const StatusMessages = ({ solutionState }) => {
  return (
    <>
      {solutionState.wasFound === false && (
        <div className="res1">No Solution found after 3000 nodes visited</div>
      )}
      {solutionState.wasFound === true && (
        <div className="res2">
          Solution found, length of solution path: {solutionState.length}
        </div>
      )}
      {solutionState.isLoading && <h3>Searching for solution...</h3>}
      <div className="spinner">
        <TailSpin
          height="50"
          width="50"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          visible={solutionState.isLoading}
        />
      </div>
    </>
  );
};

export default StatusMessages;
