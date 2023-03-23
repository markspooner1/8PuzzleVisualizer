from flask import Flask, request, jsonify
from Node import Node;
from Search import Search;
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.route('/solve', methods=['POST'])
def solve_puzzle():
    data = request.get_json()
    print(data)
    type = data['type']
    puzzle = data['puzzle']
    # loop over puzzle, if 0 is found, replace with 'B'
    for i in range(len(puzzle)):
        if puzzle[i] == '':
            puzzle[i] = 'B'
        else:
            puzzle[i] = int(puzzle[i])
    heuristic = data['heuristic']
    search = Search(type, puzzle, heuristic)
    result = search.search()
    response = jsonify({
        'solution_sequence': result})
    return response;


if __name__ == '__main__':
    app.run(debug=True)
