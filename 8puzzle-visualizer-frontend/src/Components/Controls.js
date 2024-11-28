import { searchTypes, heuristicTypes, speedTypes } from "../Helpers/helpers";

const Controls = ({
  type,
  setType,
  heuristic,
  setHeuristic,
  speedOfAnimation,
  setSpeedOfAnimation,
}) => {
  return (
    <div className="controls-section">
      <h3>Configure Your Puzzle</h3>
      <div className="controls-container">
        <div className="control-group">
          <label htmlFor="search-algo">Search Algorithm</label>
          <select
            id="search-algo"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            {searchTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.text}
              </option>
            ))}
          </select>
        </div>

        {(type === "Astar" || type === "BestFS") && (
          <div className="control-group">
            <label htmlFor="heuristic">Heuristic</label>
            <select
              id="heuristic"
              onChange={(e) => setHeuristic(e.target.value)}
              value={heuristic}
            >
              {heuristicTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.text}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="control-group">
          <label htmlFor="animation-speed">Animation Speed</label>
          <select
            id="animation-speed"
            onChange={(e) => setSpeedOfAnimation(e.target.value)}
            value={speedOfAnimation}
          >
            {speedTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Controls;
