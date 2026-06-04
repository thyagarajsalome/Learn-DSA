import type { DSATopic } from "../types/dsa";

export const topics: Record<string, DSATopic> = {
  "complexity": {
    id: "complexity",
    title: "Complexity Analysis & Notations",
    difficulty: "Fundamental",
    explanation: "Imagine you are looking for a specific card in a deck. If you check them one by one, it might take you 52 tries (Worst Case) or just 1 try (Best Case). If the deck grows to 1000 cards, it takes longer. \n\nComplexity analysis is simply a mathematical way of measuring how the run-time or memory usage of an algorithm scales as the input size (N) grows. Instead of using seconds (which change depending on how fast your computer is), we count the number of basic operations. We write this using Big-O notation, which describes the upper limit of growth (the absolute worst-case scenario).",
    useCases: ["Comparing different approaches to solve the same problem", "Ensuring systems scale to millions of users", "Avoiding slow loops in high-performance apps"],
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(n²)" },
    spaceComplexity: "O(1)",
    examTips: [
      "Big-O (O) is like the 'worst-case ceiling'. It guarantees the code won't run slower than this.",
      "Omega (Ω) is the 'best-case floor'. It describes the absolute minimum time required.",
      "Theta (Θ) is the 'tight bound'. It is used when the best and worst cases behave exactly the same.",
      "Focus on identifying loops: a single loop over N items is O(N), nested loops are usually O(N²)."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `// O(1) Constant Time: Takes the same time regardless of size
int getFirst(int arr[]) {
    return arr[0];
}

// O(N) Linear Time: Runs N times
int findMax(int arr[], int n) {
    int max = arr[0];
    for(int i = 1; i < n; i++) {
        if(arr[i] > max) max = arr[i];
    }
    return max;
}`
      },
      {
        language: "Python",
        code: `# O(1) Time
def get_first(arr):
    return arr[0]

# O(N) Time
def find_max(arr):
    return max(arr)`
      }
    ],
    quiz: [
      {
        question: "What does an O(N) time complexity tell you about an algorithm?",
        options: [
          "The execution time doubles for every new item",
          "The execution time grows linearly, in direct proportion to the input size",
          "The algorithm takes a constant amount of time regardless of size",
          "The algorithm will always execute in less than 1 second"
        ],
        answerIndex: 1,
        explanation: "O(N) represents linear scaling. If you double the size of the inputs, the number of basic operations (and time) will roughly double."
      },
      {
        question: "Which of the following describes the tight bound of an algorithm's complexity?",
        options: ["Big-O (O)", "Omega (Ω)", "Theta (Θ)", "Little-o"],
        answerIndex: 2,
        explanation: "Theta (Θ) defines a tight bound, meaning the algorithm's growth is bounded both above and below by the same mathematical function."
      }
    ]
  },
  "sparse-matrix": {
    id: "sparse-matrix",
    title: "Sparse Matrices (3-Tuple Representation)",
    difficulty: "Medium",
    explanation: "Imagine a huge checkerboard of 1000x1000 squares, but only 3 checkers are placed on it. If you allocate memory for all 1,000,000 squares, you waste massive amounts of space storing empty zeros! \n\nA Sparse Matrix is a grid where most cells are zero. To save memory, we compress it into a '3-tuple' format. Instead of saving the whole grid, we only save a list of the non-zero elements. Each non-zero cell is stored as a mini-record: [Row, Column, Value]. Additionally, we store a header row at index 0 to remember the size of the original grid: [Total Rows, Total Columns, Number of Non-Zero values].",
    useCases: ["Compression of sparse digital images", "Adjacency representation for large sparse social graphs", "Scientific finite element analysis grids"],
    timeComplexity: { best: "O(1)", average: "O(N)", worst: "O(N)" },
    spaceComplexity: "O(3 * Non-Zero Elements)",
    examTips: [
      "The header row (Index 0) acts as metadata to reconstruct the dimensions of the original matrix.",
      "Calculate memory savings: if size is R x C, storing it normally takes R*C integers. 3-tuple representation takes (Non-Zero + 1) * 3 integers.",
      "Understand the transpose operation: it flips rows with columns and reorganizes them in sorted row order."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `#define MAX_ELEMENTS 100

struct Element {
    int row;
    int col;
    int value;
};

// Array of elements to represent the compressed sparse matrix
struct Element sparse[MAX_ELEMENTS];

void createSparse(int matrix[4][4]) {
    int k = 1; // Start storing elements from index 1 (Index 0 is for metadata)
    int count = 0;
    for(int i = 0; i < 4; i++) {
        for(int j = 0; j < 4; j++) {
            if(matrix[i][j] != 0) {
                sparse[k].row = i;
                sparse[k].col = j;
                sparse[k].value = matrix[i][j];
                k++;
                count++;
            }
        }
    }
    // Store metadata at index 0
    sparse[0].row = 4;
    sparse[0].col = 4;
    sparse[0].value = count;
}`
      }
    ],
    quiz: [
      {
        question: "Why do we compress a Sparse Matrix into a 3-tuple format?",
        options: [
          "To speed up operations like element search",
          "To significantly reduce memory usage by not storing zero values",
          "Because computers cannot process multi-dimensional arrays",
          "To secure and encrypt the matrix data values"
        ],
        answerIndex: 1,
        explanation: "Since a sparse matrix is mostly zeros, storing all those zeros wastes memory. Storing only the coordinates and values of non-zero elements saves a lot of space."
      }
    ]
  },
  "hanoi": {
    id: "hanoi",
    title: "Towers of Hanoi (Recursion)",
    difficulty: "Medium",
    explanation: "Towers of Hanoi is a legendary puzzle that perfectly illustrates the beauty of recursion (solving a big problem by breaking it down into smaller identical problems). \n\nYou have 3 rods (Source, Auxiliary, Destination) and a stack of size-graded disks. The goal is to move the entire stack of disks from the Source rod to the Destination rod. There are only two rules: \n1. You can only move one disk at a time (from the top of a stack). \n2. You can never place a larger disk on top of a smaller disk.\n\nTo move N disks, the recursive algorithm does three simple steps: \n1. Recursively move the top (N-1) disks from Source to Auxiliary. \n2. Move the remaining largest disk directly from Source to Destination. \n3. Recursively move the (N-1) disks from Auxiliary to Destination.",
    useCases: ["Teaching recursive thinking & call stack frames", "Testing microprocessor computation speeds", "Simulating LIFO state stack behaviors"],
    timeComplexity: { best: "O(2ⁿ)", average: "O(2ⁿ)", worst: "O(2ⁿ)" },
    spaceComplexity: "O(n) for Call Stack",
    examTips: [
      "Every recursive function call creates an 'Activation Record' or stack frame in RAM to save current parameters.",
      "The formula for moves required is 2ⁿ - 1. For 3 disks, it takes 7 moves; for 4, it takes 15.",
      "The recurrence relation is T(n) = 2T(n-1) + 1, which solves to O(2ⁿ)."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `#include <stdio.h>

void hanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\\n", from_rod, to_rod);
        return;
    }
    // Step 1: Move top n-1 disks from Source to Auxiliary
    hanoi(n - 1, from_rod, aux_rod, to_rod);
    
    // Step 2: Move the remaining largest disk to Destination
    printf("Move disk %d from %c to %c\\n", n, from_rod, to_rod);
    
    // Step 3: Move the n-1 disks from Auxiliary to Destination
    hanoi(n - 1, aux_rod, to_rod, from_rod);
}`
      }
    ],
    quiz: [
      {
        question: "What is the recurrence relation for the Towers of Hanoi puzzle?",
        options: [
          "T(n) = T(n-1) + O(1)",
          "T(n) = 2T(n-1) + 1",
          "T(n) = T(n/2) + O(n)",
          "T(n) = 2T(n/2) + 1"
        ],
        answerIndex: 1,
        explanation: "To solve N disks, we solve (N-1) disks twice (once to move them to auxiliary, once to destination) and make 1 move for the largest disk. Thus, T(n) = 2T(n-1) + 1."
      }
    ]
  },
  "linked-list": {
    id: "linked-list",
    title: "Linked Lists",
    difficulty: "Fundamental",
    explanation: "Think of a Linked List as a train. Each train coach (called a Node) contains some passenger bags (Data) and is coupled to the next coach (a Pointer). If you want to insert a new coach in the middle, you don't have to shift all the other coaches—you just uncouple the link, insert the coach, and reconnect the couplers! \n\nUnlike Arrays, which require a single block of contiguous memory, Linked Lists store elements anywhere in memory. Each node holds its data and the memory address of the next node. In a Singly Linked List, you can only move forward. In a Doubly Linked List, each node has links to both the next and the previous node, allowing you to walk back and forth.",
    useCases: ["Building dynamic data collections whose sizes are unknown", "Implementing browser history (Back & Forward buttons use Doubly Linked Lists)", "Hash table collision resolution (Separate Chaining)"],
    timeComplexity: { best: "O(1) at head", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(n)",
    examTips: [
      "In arrays, search is fast (O(1) if index is known) but insertion/deletion is slow (O(N) to shift items). In linked lists, insertion/deletion is fast (O(1) pointers update) but search is slow (O(N) traversal).",
      "Always update the pointer of the new node first before changing the existing list's pointers, otherwise you will lose reference to the rest of the list!"
    ],
    codeSnippets: [
      {
        language: "C",
        code: `struct Node {
    int data;
    struct Node* next;
};

// Reverses a singly linked list and returns new head
struct Node* reverseList(struct Node* head) {
    struct Node* prev = NULL;
    struct Node* curr = head;
    struct Node* next = NULL;
    while (curr != NULL) {
        next = curr->next;  // Remember next node
        curr->next = prev;  // Reverse pointer link
        prev = curr;        // Move prev forward
        curr = next;        // Move curr forward
    }
    return prev;
}`
      }
    ],
    quiz: [
      {
        question: "Why is insertion in the middle of a Linked List more efficient than in an Array?",
        options: [
          "Because Linked Lists automatically sort elements",
          "Because you do not need to physically shift elements in memory; you only update pointer links",
          "Because Linked Lists are stored in contiguous memory",
          "Because insertion runs in O(log N) time"
        ],
        answerIndex: 1,
        explanation: "To insert in an array, all subsequent elements must be shifted in memory, which is O(N). In a linked list, once the position is found, you just update a few pointer addresses, which is O(1) pointer manipulation."
      }
    ]
  },
  "stack": {
    id: "stack",
    title: "Stacks & Multiple Stacks",
    difficulty: "Fundamental",
    explanation: "Think of a Stack as a pile of clean dinner plates. You can only place a new plate on the very top (Push), and you can only take a plate off from the very top (Pop). If you try to pull a plate from the middle, the pile crashes! This is known as Last-In, First-Out (LIFO). \n\nSometimes, we want to run two stacks in a single fixed-size array to save memory. This is called a Multiple Stack. We initialize Stack 1 at index -1 and grow it to the right. We initialize Stack 2 at index N (the end of the array) and grow it to the left. The array is only fully overflowed when the two top pointers meet each other.",
    useCases: ["Undo/Redo buffers in word processors", "Reversing string characters or tracking open parentheses", "Tracking nested function execution (the call stack in programming)"],
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    examTips: [
      "Stack Overflow: Trying to push when the stack is full (top == MAX - 1).",
      "Stack Underflow: Trying to pop when the stack is empty (top == -1).",
      "Multiple stacks on one array: Overflow occurs when top1 + 1 == top2."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `#define MAX 100
int arr[MAX];
int top1 = -1;
int top2 = MAX;

// Push into Stack 1 (grows right)
void push1(int val) {
    if (top1 + 1 == top2) {
        printf("Overflow: Stacks met!\\n");
        return;
    }
    arr[++top1] = val;
}

// Push into Stack 2 (grows left)
void push2(int val) {
    if (top1 + 1 == top2) {
        printf("Overflow: Stacks met!\\n");
        return;
    }
    arr[--top2] = val;
}`
      }
    ],
    quiz: [
      {
        question: "Which of the following is a LIFO (Last-In, First-Out) data structure?",
        options: ["Queue", "Binary Tree", "Stack", "Graph"],
        answerIndex: 2,
        explanation: "A Stack is LIFO because the last element pushed onto it is the first one popped off."
      }
    ]
  },
  "queue": {
    id: "queue",
    title: "Queues, Circular Queues & Dequeues",
    difficulty: "Fundamental",
    explanation: "Think of a Queue as a checkout line at a grocery store. The first person to join the line is the first person served and checked out. This is First-In, First-Out (FIFO). Adding someone to the line is called Enqueue (occurs at the back), and serving someone is called Dequeue (occurs at the front). \n\nIn a standard linear array queue, once the back pointer reaches the end, we cannot insert new elements even if the front slots are empty! To solve this, we wrap the array into a ring structure, called a **Circular Queue**. Using modulo math: `rear = (rear + 1) % MAX_SIZE`, the pointers wrap around. A **Dequeue** (Double-Ended Queue) is a more flexible queue where items can be added or removed from both ends.",
    useCases: ["Printers queuing jobs to be printed", "CPU and network packet task scheduling", "Breadth-First Search (BFS) level-order traversal queue"],
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    spaceComplexity: "O(n)",
    examTips: [
      "Circular queue full check: (rear + 1) % SIZE == front.",
      "Circular queue empty check: front == -1.",
      "Dequeues have two main variants: Input-Restricted (insert only at rear, delete both sides) and Output-Restricted (delete only at front, insert both sides)."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `#define SIZE 5
int q[SIZE];
int front = -1, rear = -1;

void enqueueCircular(int val) {
    if ((rear + 1) % SIZE == front) {
        printf("Queue Full!\\n");
        return;
    }
    if (front == -1) front = 0;
    rear = (rear + 1) % SIZE;
    q[rear] = val;
}

int dequeueCircular() {
    if (front == -1) {
        printf("Queue Empty!\\n");
        return -1;
    }
    int val = q[front];
    if (front == rear) {
        front = -1; rear = -1; // Reset queue if it becomes empty
    } else {
        front = (front + 1) % SIZE;
    }
    return val;
}`
      }
    ],
    quiz: [
      {
        question: "Why do we prefer Circular Queues over standard Linear Queues implemented in static arrays?",
        options: [
          "Circular Queues run in logarithmic time",
          "They automatically sort elements",
          "They reuse empty slots at the beginning of the array after elements are dequeued",
          "They do not require pointer trackers"
        ],
        answerIndex: 2,
        explanation: "In a linear queue, when elements are dequeued, their space is wasted because the rear pointer only goes forward. A circular queue wraps around, reclaiming those empty slots."
      }
    ]
  },
  "trees": {
    id: "trees",
    title: "Binary Trees & AVL Balancing",
    difficulty: "Medium",
    explanation: "Think of a Tree like a family tree or a filing system. You have a main root folder (Root Node) which branches out into subfolders (Child Nodes). Nodes with no children are called Leaves. \n\nIn a **Binary Search Tree (BST)**, nodes follow a specific rule: for any node, all values in its left subtree are smaller, and all values in its right subtree are larger. This makes searching incredibly fast! However, if you insert values in sorted order (e.g. 10, 20, 30), the tree becomes a straight line, losing its speed benefits. \n\nTo solve this, we use **AVL Trees**, which are self-balancing BSTs. Every node maintains a 'Balance Factor' (Height of Left subtree - Height of Right subtree). If the balance factor differs by more than 1 (BF becomes -2 or 2), the tree reorganizes itself using single or double rotations (shifting nodes left or right) to stay balanced.",
    useCases: ["Computer file directory systems", "Database indexing structures for rapid row lookups", "Compilers compiling source code syntax trees"],
    timeComplexity: { best: "O(log n)", average: "O(log n)", worst: "O(n) if unbalanced" },
    spaceComplexity: "O(n)",
    examTips: [
      "Inorder Traversal of a BST always prints values in ascending sorted order.",
      "AVL Balance Factors must only be -1, 0, or 1.",
      "Understand the 4 AVL rotation triggers: LL (rotate root right), RR (rotate root left), LR (rotate child left, root right), RL (rotate child right, root left)."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

// BST Insertion
struct Node* insert(struct Node* node, int val) {
    if (node == NULL) {
        struct Node* temp = (struct Node*)malloc(sizeof(struct Node));
        temp->data = val;
        temp->left = temp->right = NULL;
        return temp;
    }
    if (val < node->data)
        node->left = insert(node->left, val);
    else if (val > node->data)
        node->right = insert(node->right, val);
    return node;
}`
      }
    ],
    quiz: [
      {
        question: "In a Binary Search Tree (BST), what traversal method produces elements in sorted ascending order?",
        options: ["Preorder Traversal", "Postorder Traversal", "Inorder Traversal", "Level-order Traversal"],
        answerIndex: 2,
        explanation: "Inorder traversal visits Left, then Root, then Right. Because of the BST property (Left < Root < Right), this yields elements in sorted ascending order."
      },
      {
        question: "What is the balance factor of a node in an AVL tree?",
        options: [
          "Height(Left Subtree) + Height(Right Subtree)",
          "Height(Left Subtree) - Height(Right Subtree)",
          "Number of left children - Number of right children",
          "Depth of node from root"
        ],
        answerIndex: 1,
        explanation: "Balance Factor is defined as the height difference between the left and right subtrees (Height(Left) - Height(Right))."
      }
    ]
  },
  "graphs": {
    id: "graphs",
    title: "Graphs & Traversals",
    difficulty: "Advanced",
    explanation: "A Graph is like a map of airline flights or a network of Facebook friends. It consists of circles (Vertices or Nodes) connected by lines (Edges). Edges can be undirected (friendship is mutual) or directed (one-way flights). They can also have weights (e.g. distance or flight cost). \n\nWe traverse graphs using two classic methods: \n- **Breadth-First Search (BFS)**: Visits neighbors level-by-level (like ripples expanding in water), using a Queue. \n- **Depth-First Search (DFS)**: Goes as deep as possible down a path before backtracking, using a Stack or recursion. \n\nFor weighted graphs, **Dijkstra's Algorithm** finds the shortest path between nodes by expanding the path with the lowest accumulated cost.",
    useCases: ["GPS Map routing for shortest distance", "Recommendation systems suggesting mutual friends", "Network cabling designs using Minimum Spanning Trees (MST)"],
    timeComplexity: { best: "O(V + E)", average: "O(V + E)", worst: "O(V²)" },
    spaceComplexity: "O(V + E)",
    examTips: [
      "BFS uses a Queue; DFS uses a Stack (or recursion call frames).",
      "Graph representations: Adjacency Matrix (2D grid, O(V²) space, fast edge check) and Adjacency List (Array of linked lists, O(V+E) space, fast neighbors iteration)."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `// DFS Traversal using Recursion
void DFS(int vertex, int visited[10], int adjMatrix[10][10], int V) {
    visited[vertex] = 1;
    printf("%d ", vertex);
    for(int i = 0; i < V; i++) {
        if(adjMatrix[vertex][i] == 1 && !visited[i]) {
            DFS(i, visited, adjMatrix, V);
        }
    }
}`
      }
    ],
    quiz: [
      {
        question: "Which of the following graph algorithms finds the shortest path from a single source node to all other nodes?",
        options: ["Kruskal's Algorithm", "Dijkstra's Algorithm", "Prim's Algorithm", "Depth-First Search"],
        answerIndex: 1,
        explanation: "Dijkstra's algorithm calculates the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge costs."
      }
    ]
  },
  "sorting": {
    id: "sorting",
    title: "Sorting Algorithms",
    difficulty: "Medium",
    explanation: "Imagine you are sorting a stack of books by their heights. You could scan them and swap adjacent books that are out of order until sorted (Bubble Sort). You could search for the smallest book and swap it to the front (Selection Sort). Or you could take books one by one and insert them in their correct relative positions (Insertion Sort). \n\nFor larger collections, we use much faster 'Divide-and-Conquer' algorithms: \n- **Quick Sort**: Selects a 'Pivot' element and splits the array into elements smaller than the pivot and elements larger than it, sorting recursively. \n- **Merge Sort**: Cuts the array in half recursively, sorts the halves, and merges them back together.",
    useCases: ["Sorting search results by relevance", "Optimizing databases before building search indexes", "Preparing data arrays for fast Binary Search"],
    timeComplexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
    spaceComplexity: "O(n) for Merge Sort",
    examTips: [
      "Merge Sort always runs in O(n log n) but requires O(N) extra helper memory.",
      "Quick Sort has O(n²) worst-case when the pivot is always the smallest or largest element.",
      "A sorting algorithm is 'stable' if elements with identical keys retain their relative original order."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `// Bubble Sort Implementation
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
        for (int j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                // Swap
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`
      }
    ],
    quiz: [
      {
        question: "What is the main drawback of Merge Sort despite its guaranteed O(n log n) running time?",
        options: [
          "It has an O(n²) worst-case time complexity",
          "It is an unstable sorting algorithm",
          "It requires O(n) auxiliary memory space to merge arrays",
          "It cannot process floating-point numbers"
        ],
        answerIndex: 2,
        explanation: "Merge Sort allocates a helper array of size N to merge split segments. This O(n) space complexity is its main downside compared to in-place algorithms like Quick Sort."
      }
    ]
  },
  "searching": {
    id: "searching",
    title: "Searching (Linear vs Binary)",
    difficulty: "Fundamental",
    explanation: "Searching is the process of finding a target value in a list. \n\n- **Linear Search**: Think of searching a physical dictionary page-by-page from the start. You check every single page until you find the word. It's simple, works on unsorted lists, but takes O(N) steps. \n- **Binary Search**: Think of opening the dictionary in the middle. If the target word comes alphabetically after the middle page, you discard the entire first half! You repeat this 'split-in-half' process. It runs in incredibly fast O(log N) time, but it only works if the list is sorted first.",
    useCases: ["Finding records by database IDs", "Checking word existence in spelling dictionaries", "Git bisect tool searching for bugs in code history"],
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(log n)" },
    spaceComplexity: "O(1)",
    examTips: [
      "Binary search requires the target array to be sorted beforehand.",
      "Each step of binary search discards exactly 50% of the remaining search space.",
      "Worst-case steps for Binary Search is roughly log2(N) + 1."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `// Binary Search (Iterative)
int binarySearch(int arr[], int size, int target) {
    int left = 0, right = size - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;     // Target found!
        if (arr[mid] < target) left = mid + 1;  // Ignore left half
        else right = mid - 1;                   // Ignore right half
    }
    return -1; // Target not found
}`
      }
    ],
    quiz: [
      {
        question: "What is the maximum number of comparisons needed to find a value in a sorted array of 1024 elements using Binary Search?",
        options: ["1024", "512", "11", "20"],
        answerIndex: 2,
        explanation: "Binary search cuts space in half. Since log2(1024) = 10, it takes at most 10 + 1 = 11 comparisons in the absolute worst case."
      }
    ]
  },
  "hash-table": {
    id: "hash-table",
    title: "Hash Tables & Hashing",
    difficulty: "Medium",
    explanation: "Imagine a wall of post office mail slots. Each slot is labeled with an index number. When a letter arrives, you run the recipient's name through a formula (Hash Function) that calculates a slot index. You put the letter there. Lookups are instant because you just re-run the formula to find the exact slot index! \n\nSometimes, two different names produce the exact same slot index. This is a **Collision**. We resolve collisions using two strategies: \n1. **Separate Chaining**: Each slot holds a linked list. Colliding letters are simply appended to the list. \n2. **Linear Probing**: If the slot is taken, we look at the next slot (index + 1), then the next, until we find an empty slot.",
    useCases: ["Database indexing caches", "Username lookup validation systems", "Compilers checking keyword lists"],
    timeComplexity: { best: "O(1)", average: "O(1)", worst: "O(n) if all keys collide" },
    spaceComplexity: "O(n)",
    examTips: [
      "Load Factor (λ) is defined as: (number of keys / total bucket size). When load factor is high, collisions increase.",
      "Linear Probing can lead to 'primary clustering' where adjacent occupied slots group together, slowing down searches."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `// Simple modulo hash function
int getHash(int key, int tableSize) {
    return key % tableSize;
}

// Storing data with linear probing
void insertProbing(int table[], int size, int key) {
    int index = getHash(key, size);
    int i = 0;
    while (table[(index + i) % size] != -1) { // Find next empty slot (-1)
        i++;
        if (i == size) {
            printf("Hash Table Full!\\n");
            return;
        }
    }
    table[(index + i) % size] = key;
}`
      }
    ],
    quiz: [
      {
        question: "What is a collision in a Hash Table?",
        options: [
          "When the hash function output exceeds the maximum integer limit",
          "When two different keys produce the exact same hash index",
          "When memory allocation for the table fails",
          "When a key-value pair is deleted from the table"
        ],
        answerIndex: 1,
        explanation: "A collision happens when two distinct keys run through the hash function and return the exact same index location."
      }
    ]
  },
  "file-org": {
    id: "file-org",
    title: "File Organization Techniques",
    difficulty: "Medium",
    explanation: "File Organization is the method of structuring records inside physical storage files on disks. \n\n- **Sequential File**: Records are saved in sorted order. If you want to insert a record, you must copy and re-write the entire file! Reading is sequential (scanning page-by-page), taking O(N) time.\n- **Direct (Hashed) File**: Records are written directly to disk sectors computed via a hash function on the record key. Access is instant, but there is no logical ordering.\n- **Indexed Sequential (ISAM)**: Think of a book. It has a index page mapping topic titles to page numbers, while the pages themselves are in sequential order. ISAM maintains an Index File mapping keys to block addresses, enabling fast random searching while keeping data physically sorted.",
    useCases: ["Database storage layouts on hard drives", "Tape drive archiving systems (Sequential)", "High-performance file system indexing structures"],
    timeComplexity: { best: "O(1)", average: "O(log n)", worst: "O(n)" },
    spaceComplexity: "O(n) for index structures",
    examTips: [
      "Sequential file is best for batch processing (where you read every record sequentially).",
      "ISAM files use index levels (Cylinder index, Track index) to locate blocks, avoiding linear searches.",
      "Direct files are extremely fast for random lookups but cannot do range scans (e.g. 'find all users with ID between 10 and 20')."
    ],
    codeSnippets: [
      {
        language: "C",
        code: `// Record entry layout
struct UserRecord {
    int id;
    char name[40];
    long fileOffset; // Sector byte position pointer
};`
      }
    ],
    quiz: [
      {
        question: "Which file organization method is best suited for both fast random lookups and fast sequential processing of records?",
        options: [
          "Sequential File Organization",
          "Direct File Organization",
          "Indexed Sequential Access Method (ISAM)",
          "Heap File Organization"
        ],
        answerIndex: 2,
        explanation: "ISAM keeps data records physically sorted (ideal for sequential scans) and uses an index directory to map keys to blocks (ideal for fast random lookups)."
      }
    ]
  }
};