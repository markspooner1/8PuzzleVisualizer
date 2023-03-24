export const useGetSolution =  () => {
  const handleSolution = async (puzzle, type, heuristic) => {
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
      return data;
      
    };
    return { handleSolution };
};
