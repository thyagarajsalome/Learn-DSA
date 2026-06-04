# 10-Day Data Structures & Algorithms Mastery Plan

This intensive study plan is designed to help you build a deep, intuitive understanding of Data Structures and Algorithms (DSA). By combining theoretical study with interactive visualization practice, you will master the mental models required to solve complex computational problems.

---

## 📅 Day-by-Day Study Schedule

```
  Day 1: Analysis & Complexity ──► Day 2: Sparse Matrices & Arrays ──► Day 3: Linked Lists (Singly/Doubly)
                                                                                  │
  Day 6: AVL Rotations & Trees ◄── Day 5: Queues & Circular Queues  ◄── Day 4: Stacks & Multiple Stacks
        │
  Day 7: BFS & DFS (Graphs)    ──► Day 8: Shortest Path & Routing   ──► Day 9: Sorting & Searching
                                                                                  │
                                            Day 10: File Structures & Hashing ◄───┘
```

### 🔹 Day 1: Algorithmic Thinking & Complexity Analysis
*   **Core Concepts:**
    *   What is an Algorithm? Key characteristics: finiteness, definiteness, input, output, effectiveness.
    *   Asymptotic Notations: Big-Oh ($O$), Omega ($\Omega$), Theta ($\Theta$) - formal mathematical definitions and graphical meanings.
    *   Time and Space Complexity Analysis: Worst-case, Best-case, and Average-case scenarios.
*   **Key Coding & Interview Challenges:**
    *   Explain the difference between Time Complexity and Space Complexity.
    *   Analyze recursive calls and learn to build recurrence relations.
*   **Visualizer Focus:** Explore the Complexity cards and Sorting/Searching comparisons to observe performance differences in real time.

### 🔹 Day 2: Arrays & Memory Management
*   **Core Concepts:**
    *   Contiguous Memory Allocation: Row-major and Column-major addressing math for multi-dimensional arrays.
    *   **Sparse Matrix**: Storing matrices with mostly zero values efficiently using a 3-tuple (Row, Column, Value) layout.
*   **Key Coding & Interview Challenges:**
    *   Write an address calculation function to find the memory offset of an element in a 2D array.
    *   Implement an algorithm to transpose a Sparse Matrix in 3-tuple format.
*   **Visualizer Focus:** Navigate to the **Sparse Matrix** tab to see how a sparse grid is compressed into a 3-tuple table.

### 🔹 Day 3: Linked Lists (Singly, Doubly, Circular)
*   **Core Concepts:**
    *   Sequential Allocation (Arrays) vs. Linked Allocation (Nodes).
    *   Structure and pointer updates in Singly Linked Lists, Doubly Linked Lists, and Circular Linked Lists.
    *   Core Operations: Insertion, Deletion, and Searching at specific locations (Head, Tail, Middle).
*   **Key Coding & Interview Challenges:**
    *   Reverse a Singly Linked List in place.
    *   Detect cycles in a Linked List (Floyd's Cycle-Finding Algorithm).
*   **Visualizer Focus:** Toggle between Singly, Doubly, and Circular lists. Step through the visualizations to see how pointers update on node actions.

### 🔹 Day 4: Stacks & Applications
*   **Core Concepts:**
    *   LIFO (Last In First Out) principle and core stack operations: Push, Pop, Peek.
    *   Array-based vs. Pointer-based (Linked List) stack implementations.
    *   **Multiple Stacks**: Dynamically sharing a single array buffer between multiple stack frames.
    *   Applications: Infix-to-Postfix/Prefix conversions, expression evaluation, and recursion tracking.
*   **Key Coding & Interview Challenges:**
    *   Implement a Stack that supports `min()` in $O(1)$ time.
    *   Evaluate a Postfix expression step-by-step using a stack trace.
*   **Visualizer Focus:** Use the **Two Stacks in One Array** simulation on the Stack page to watch stack boundaries grow towards each other.

### 🔹 Day 5: Queues (Linear, Circular, Deque)
*   **Core Concepts:**
    *   FIFO (First In First Out) principle and core queue operations: Enqueue, Dequeue.
    *   **Circular Queue**: Avoiding memory waste by wrapping pointers using modulo arithmetic: `rear = (rear + 1) % MAX_SIZE`.
    *   **Deque (Double-ended Queue)**: Implementing input-restricted and output-restricted double-ended queues.
*   **Key Coding & Interview Challenges:**
    *   Implement a Queue using Stacks.
    *   Design a Circular Queue with proper overflow and underflow checks.
*   **Visualizer Focus:** Experiment with the **Circular Queue Ring Buffer** simulation to see the `front` and `rear` pointers wrap around.

### 🔹 Day 6: Trees & Balance-Balancing Trees (AVL)
*   **Core Concepts:**
    *   Hierarchical structures: Root, Parent, Children, Height, and Depth.
    *   Binary Trees vs. Binary Search Trees (BST): Insertion, Deletion, and search rules.
    *   Tree Traversals: Inorder (L-Root-R), Preorder (Root-L-R), and Postorder (L-R-Root).
    *   **AVL Tree**: Self-balancing BST where the Balance Factor (BF) stays within $\{-1, 0, 1\}$.
    *   AVL Rotations: Single (LL, RR) and Double (LR, RL) rotations.
*   **Key Coding & Interview Challenges:**
    *   Write a recursive function to find the max depth of a Binary Tree.
    *   Perform step-by-step insertions into an AVL tree and identify when rotations are triggered.
*   **Visualizer Focus:** Use the **BST Simulator** to run traversals, and test the **AVL Rotations Demo** to see how rotations rebalance nodes.

### 🔹 Day 7: Recursion & Backtracking
*   **Core Concepts:**
    *   Recursion Base Case vs. Recursive Step. Understanding Call Stacks.
    *   Divide-and-Conquer strategy.
    *   The Classic Towers of Hanoi problem and its recursive logic.
*   **Key Coding & Interview Challenges:**
    *   Derive the time complexity of the Towers of Hanoi recursive relation ($O(2^n)$).
    *   Write a recursive function to generate the Fibonacci sequence.
*   **Visualizer Focus:** Play the **Towers of Hanoi** visualizer. Click **Auto-Solve** to trace the call stack tree of recursive calls.

### 🔹 Day 8: Graphs, Traversals & Routing
*   **Core Concepts:**
    *   Graph Representations: Adjacency Matrices and Adjacency Lists.
    *   Traversals: Breadth-First Search (BFS) and Depth-First Search (DFS).
    *   **Shortest Path**: Dijkstra's Algorithm (Single-Source Shortest Path using a greedy priority queue).
    *   **Minimum Spanning Trees (MST)**: Prim's (vertex-based) and Kruskal's (edge-based) algorithms.
*   **Key Coding & Interview Challenges:**
    *   Find the shortest path in a weighted graph using Dijkstra's algorithm.
    *   Detect cycles in undirected and directed graphs.
*   **Visualizer Focus:** Go to the Graph page, build custom configurations, and run BFS, DFS, and Dijkstra simulations.

### 🔹 Day 9: Searching & Sorting Algorithms
*   **Core Concepts:**
    *   Searching: Linear Search ($O(N)$) vs. Binary Search ($O(\log N)$).
    *   Quadratic Sorting: Bubble Sort, Selection Sort, and Insertion Sort ($O(N^2)$).
    *   Divide-and-Conquer Sorting: Quick Sort (pivot partitioning) and Merge Sort (merge sort tree recombination) ($O(N \log N)$).
*   **Key Coding & Interview Challenges:**
    *   Write a partition function for Quick Sort.
    *   Implement binary search iteratively and recursively.
*   **Visualizer Focus:** Compare Linear vs. Binary search side-by-side, and inspect Quick Sort or Merge Sort comparisons.

### 🔹 Day 10: Hashing & File Organization
*   **Core Concepts:**
    *   **Hashing**: Mapping keys to storage offsets. Hash functions (Modulo, folding, mid-square).
    *   Collision Resolution: Open Addressing (Linear Probing, Quadratic Probing, Double Hashing) and Separate Chaining.
    *   **File Organization**:
        *   *Sequential File Org*: Records stored in key sequence. Slow search ($O(N)$).
        *   *Direct File Org*: Using a hash function to map keys to logical disk sector offsets for $O(1)$ lookup.
        *   *ISAM (Indexed Sequential Access Method)*: Maintaining hierarchical index tables that point to blocks of sequentially sorted record sequences.
*   **Key Coding & Interview Challenges:**
    *   Write a hash table with separate chaining.
    *   Differentiate between Linear Probing and Separate Chaining in terms of load factors.
*   **Visualizer Focus:** Use the Hash Table buckets visualizer and review the File Organization interactive layouts.

---

## 💡 Practical Interview & Coding Strategy
1.  **Draft Visual Diagrams First:** Before writing code, visualize the structure (linked lists, stacks, recursion trees). Draw pointers and indices to avoid off-by-one errors.
2.  **Confirm Input Constraints:** Always think about edge cases: empty structures, single-node elements, and boundary values.
3.  **Explain Complexities Upfront:** Whenever you present an algorithmic solution, clearly state the Time and Space complexities for both the best and worst cases.
