import type { DSATopic } from "../types/dsa";

export const topics: Record<string, DSATopic> = {
  "arrays": {
    id: "arrays",
    title: "Arrays & Dynamic Arrays",
    difficulty: "Fundamental",
    explanation: "An array is a collection of items stored at contiguous memory locations. A dynamic array resizes itself automatically when it runs out of space.",
    useCases: ["Storing leaderboards", "Implementing matrices/grids", "Buffer for I/O operations"],
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)"
  },
  "linked-list": {
    id: "linked-list",
    title: "Linked Lists",
    difficulty: "Fundamental",
    explanation: "A linear collection of data elements whose order is not given by physical placement in memory. Each element (node) points to the next.",
    useCases: ["Browser history (Doubly Linked)", "Undo functionality", "Hash table chaining for collision resolution"],
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)"
  },
  "stack": {
    id: "stack",
    title: "Stacks (LIFO)",
    difficulty: "Fundamental",
    explanation: "A Stack is a linear data structure that follows a particular order in which the operations are performed. The order is LIFO (Last In First Out).",
    useCases: ["Function call stack in programming", "Syntax parsing (matching brackets)", "Backtracking algorithms"],
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)"
  },
  "queue": {
    id: "queue",
    title: "Queues (FIFO)",
    difficulty: "Fundamental",
    explanation: "A Queue is a linear structure which follows a particular order in which the operations are performed. The order is FIFO (First In First Out).",
    useCases: ["CPU task scheduling", "Handling web server requests", "Breadth-First Search (BFS) in Graphs"],
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)"
  },
  "hash-table": {
    id: "hash-table",
    title: "Hash Tables",
    difficulty: "Medium",
    explanation: "A Hash Table maps keys to values for highly efficient lookup. It uses a hash function to compute an index into an array of buckets.",
    useCases: ["Database indexing", "Caching / Memoization", "Unique data representation"],
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n)" },
    spaceComplexity: "O(n)"
  },
  "trees": {
    id: "trees",
    title: "Trees & Binary Search Trees",
    difficulty: "Medium",
    explanation: "A Tree is a hierarchical data structure consisting of nodes connected by edges. A BST is a special tree where the left child is smaller and the right child is greater than the parent.",
    useCases: ["File systems", "DOM rendering in browsers", "Fast search algorithms"],
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n)"
  },
  "graphs": {
    id: "graphs",
    title: "Graphs",
    difficulty: "Advanced",
    explanation: "A Graph is a non-linear data structure consisting of nodes (vertices) and edges. They can be directed or undirected.",
    useCases: ["Social networks (friends graph)", "GPS Navigation (shortest path)", "Recommendation engines"],
    timeComplexity: { best: "O(V+E)", average: "O(V+E)", worst: "O(V^2)" },
    spaceComplexity: "O(V+E)"
  },

"sorting": {
    id: "sorting",
    title: "Sorting Algorithms",
    difficulty: "Medium",
    explanation: "Sorting algorithms put elements of a list into an order (e.g., numerical or lexicographical). We will visualize Bubble Sort, which repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    useCases: ["E-commerce product sorting", "Preparing data for Binary Search", "Database indexing"],
    timeComplexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
    spaceComplexity: "O(1)"
  },
  "searching": {
    id: "searching",
    title: "Searching (Binary Search)",
    difficulty: "Fundamental",
    explanation: "Binary Search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item.",
    useCases: ["Finding a word in a dictionary", "Database lookups", "Debugging (git bisect)"],
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)"
  }

};