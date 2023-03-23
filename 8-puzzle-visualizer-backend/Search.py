# Init open list with top node
# init closed list to empty

from Node import *
from collections import deque
# 1 2 3
# 8   4  
# 7 6 5
class Search:
    def __init__(self, type, puzzle, heuristic = None):
        self.type = type
        self.root = Node(None, puzzle, 0, heuristic, type)
        self.nodesVisited = 0
        self.closed = []
        if type == "DFS":
            self.open = []
        else:
            self.open = deque();
    def search(self):
        #print(self.type)
        if self.type == "DFS":
            return self.DFS()
        elif self.type == "BFS":
            return self.BFS()
        elif self.type == "BestFS":
            return self.BestFS()
        elif self.type == "Astar":
            return self.AStar()
            
    def DFS(self):
        
        # DFS is implemented with a stack
        self.open.append(self.root)
        while(len(self.open) > 0):
            x = self.open.pop()  
            
            # If goal is reached, trace path and return
            if x.isGoal():
                return self.tracePath(x, x.depth, len(self.closed))
                
            # If goal is not reached, generate children of x and add to top of stack if child is not on open or closed
            else:
                x.generateSuccessors()
                self.closed.append(x)
                for child in x.children:
                    if not self.isOnOpenOrClosed(child.state):
                        self.open.append(child)
    def BFS(self):
        
        # BFS is implemented with a queue
        self.open.append(self.root)        
        while(len(self.open) > 0):
            x = self.open.popleft()

            # if goal is reached, trace path and return
            if x.isGoal():
                x.printPuzzle()
                return self.tracePath(x, x.depth, len(self.closed))
                
               
            
            # if goal is not reached, generate children of x and add to end of queue if child is not on open or self.closed
            else:
                x.generateSuccessors()
                self.closed.append(x)
                for child in x.children:
                    if not self.isOnOpenOrClosed(child.state):
                        self.open.append(child)

    def BestFS(self):
        # BestFS is implemented with a priority queue sorted by path cost
        self.open.append(self.root)

        
        while(len(self.open) > 0):

            x = self.open.popleft()
            self.closed.append(x)
            # if goal is reached, trace path and return
            if x.isGoal():
                return  self.tracePath(x, x.depth, len(self.closed))
             
            
            # if goal is not reached, generate children of x and add to end of queue if child is not on self.open or closed
            else:
                x.generateSuccessors()
                for child in x.children:
                    if not self.isOnOpenOrClosed(child.state):
                        self.open.append(child)
                self.open = deque(sorted(self.open, key=lambda x: x.pathCost))

    def AStar(self):
        # AStar is implemented with a priority queue sorted by f value (path cost + heuristic)
        self.open.append(self.root)
       
        
        while(len(self.open) > 0):
            x = self.open.popleft()
            # if goal is reached, trace path and return
            if x.isGoal():
                print("goal")
                return self.tracePath(x, x.depth, len(self.closed))
            #return no solution found if length of closed list is 1000
            elif len(self.closed) > 1000:
                return "No solution"
            # if goal is not reached, generate children of x
            else:
                self.closed.append(x)
                x.generateSuccessors()
                for child in x.children:
                    # check if child is already on Open or self.closed list
                    ExistsOnClosed = self.findNodeOnOpenOrClosedList(self.closed, child.state)
                    ExistsOnOpen = self.findNodeOnOpenOrClosedList(self.open, child.state)

                    # if child is already on closed, check if child has a lower f value than the one on closed
                    # if it does, we found a more optimal path to the node on closed, need to reconsider it so add it to open
                    if ExistsOnClosed is not None:
                        if ExistsOnClosed[0].f_value > child.f_value:
                            self.open.append(child)
                            del self.closed[ExistsOnClosed[1]]

                    # if child is already on open, check if child has a lower f value than the one on open
                    # replace the one on open with the child if it does
                    elif ExistsOnOpen is not None:
                        if ExistsOnOpen[0].f_value > child.f_value:
                            self.open.append(child)
                            del self.open[ExistsOnOpen[1]]
                    else:
                        self.open.append(child)
                        
                # sort open list by f value
                self.open = deque(sorted(self.open, key=lambda x: x.f_value))

    # check if puzzle is on open or closed list
    def isOnOpenOrClosed(self,puzzle, type = None):
        res1 = False
        res2 = False
        for node in self.open:
            if node.state == puzzle:
                res1 = True
        for node in self.closed:
            if node.state == puzzle:
                res2 = True
        return res1 or res2

    # check if node exists on open or closed, if so return the index and node its found at
    def findNodeOnOpenOrClosedList(self, list, puzzle):
        for i,node in enumerate(list):
            if node.state == puzzle:
                return [node,i]
        return None

    # trace path from goal to start
    def tracePath(self, node, depth, length):
        path = []
        # loop until we find start state
        while(node != None):
            for i in range(len(node.state)):
                if node.state[i] == 'B':
                    node.state[i] = '';
            path.append(node.state)
            node = node.parent
        path.reverse()
        print(path)
        return path



        

