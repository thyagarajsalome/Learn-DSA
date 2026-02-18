import { DSATopic } from "../types/dsa";

export const topics: Record<string, DSATopic> = {
  "arrays": {
    id: "arrays",
    title: "Arrays & Dynamic Arrays",
    difficulty: "Fundamental",
    explanation: "An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.",
    useCases: ["Storing leaderboards", "Implementing matrices/grids", "Buffer for I/O operations"],
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)"
  },
  "linked-list": {
    id: "linked-list",
    title: "Linked Lists",
    difficulty: "Fundamental",
    explanation: "A linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next.",
    useCases: ["Browser history (Doubly Linked)", "Undo functionality", "Hash table chaining"],
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)"
  }
  // Add Trees, Graphs, DP, Tries, etc.
};