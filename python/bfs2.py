
from collections import deque

maze = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]

def is_valid(visited)

def bfs(maze):
    queue = deque()
    visited = set() # { (x, y) }
    
    directions = [(0, -1), (0, 1), (-1, 0), (1, 0)]

    while queue:
        
        cur_x, cur_y = queue.popleft()

        for x, y in directions:
            if maze[cur_x + x][cur_y + y] in visited:
                continue
            # checking
            queue.append((cur_x + x, cur_y + y))
