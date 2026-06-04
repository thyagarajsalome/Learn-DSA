# Module 13: Graphs & Routing

A Graph is a network structure consisting of vertices (nodes) connected by edges (links). Graphs are the most generalized data structures.

---

## 1. Graph Representations

```
Adjacency Matrix:      Adjacency List:
   A  B  C
A [0  1  0]            A ──► [B | NULL]
B [1  0  1]            B ──► [A] ──► [C | NULL]
C [0  1  0]            C ──► [B | NULL]
```

1. **Adjacency Matrix**: A 2D grid where `Grid[i][j] = 1` indicates an edge between node $i$ and $j$. Fast edge lookups $O(1)$, but wastes memory $O(V^2)$.
2. **Adjacency List**: An array of linked lists, where list $i$ stores all adjacent neighbors of node $i$. Memory efficient $O(V + E)$ for sparse networks.

---

## 2. Graph Traversals

To search networks, we traverse nodes using two fundamental strategies:

### 🔹 Breadth-First Search (BFS)
Traverses level-by-level (radiates outwards from starting node).
- *Data Structure used*: **Queue**.
- *Best for*: Finding the **Shortest Path** on unweighted graphs (like flight connections with fewest layovers).

### 🔹 Depth-First Search (DFS)
Traverses as deep as possible down a path, then backtracks when hitting a dead end.
- *Data Structure used*: **Stack** (or recursion).
- *Best for*: Connectivity checks, maze solving, and finding loops/cycles.

---

## 3. Shortest Path: Dijkstra's Algorithm

Dijkstra's Algorithm finds the single-source shortest path on a **weighted graph** (where edges have distance costs).

### 🔍 How it works:
1. Initialize distances from Start node to all other nodes as **Infinity** ($\infty$). Set distance to Start node = `0`.
2. Pick the unvisited node with the smallest distance value (greedy selection).
3. Update distances of its neighbors: if `dist[current] + weight < dist[neighbor]`, update `dist[neighbor]`.
4. Mark current node as visited. Repeat until all nodes are visited.

🌐 **Real Use Case**: Dijkstra's algorithm powers **Google Maps** when calculating the fastest driving route between two address locations.
