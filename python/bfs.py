from __future__ import annotations


class Node:
    def __init__(self, id: str):
        self.id    = id
        self.edges = []

    def add_edges(self, *nodes: Node):
        for n in nodes:
            self.edges.append(n)

    def __repr__(self):
        return f'{self.id}: {[ str(e.id) for e in self.edges ]}'

class Graph:
    def __init__(self):
        self.graph: list[Node] = []

    def add_nodes(self, *nodes: Node):
        for n in nodes:
            self.graph.append(n)

    def __repr__(self):
        return f'{[ str(n) for n in self.graph ]}'

def bfs(graph):
    pass


if __name__ == '__main__':
    A = Node('A')
    B = Node('B')
    C = Node('C')
    D = Node('D')

    A.add_edges(B, C)
    B.add_edges(D)
    C.add_edges(D)
    D.add_edges(A, C)

    g = Graph()
    g.add_nodes(A, B, C, D)
    print(g)

