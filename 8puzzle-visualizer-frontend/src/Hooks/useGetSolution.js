export const useGetSolution = () => {
  const handleSolution = async (puzzle, type, heuristic) => {
    const response = await fetch(
      "https://h2ki6up89b.us-east-1.awsapprunner.com/solve",
      {
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
      }
    );
    const data = await response.json();
    return data;
  };
  return { handleSolution };
};
