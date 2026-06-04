# Module 14: Advanced Algorithms

With core data structures mastered, we can study advanced algorithm design paradigms.

---

## 1. Greedy Algorithms

### ❓ What is a Greedy Algorithm?
An algorithm that makes the locally optimal choice at each step, hoping that these local choices lead to a globally optimal solution.

- *Pros*: Fast, simple to write.
- *Cons*: Doesn't always yield the absolute best solution.
- *Examples*: Dijkstra's Shortest Path, Prim's and Kruskal's Minimum Spanning Tree algorithms.

---

## 2. Dynamic Programming (DP)

### ❓ What is Dynamic Programming?
An optimization technique used to solve complex problems by breaking them down into overlapping subproblems, solving each subproblem **exactly once**, and storing their results.

### 💡 Why do we need it?
In recursion, we often compute the same value repeatedly. For example, computing Fibonacci $F(5)$ requires computing $F(3)$ twice. DP saves CPU time by caching results.

```
                     F(5)
                   /      \
                F(4)      F(3)  <── Already solved!
               /    \     /   \
             F(3)   F(2) F(2) F(1)
```

### 🔍 Two Approaches
1. **Memoization (Top-Down)**: Write recursion but store computed subproblem results in a lookup table.
2. **Tabulation (Bottom-Up)**: Solve base cases first and fill a table iteratively from bottom to top.

---

## 3. Divide-and-Conquer

### ❓ What is it?
A strategy that breaks a large problem into smaller, independent subproblems, solves the subproblems recursively, and merges their results.
- *Examples*: Binary Search, Merge Sort, Quick Sort.

---

## 🏆 Graduation Complete!
Congratulations! You have completed the DSA Learning Curriculum. You have mastered the logic, mathematical constraints, and memory representation models that power modern software. Keep visualising, keep coding!
