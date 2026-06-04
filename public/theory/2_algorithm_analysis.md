# Module 2: Algorithm Analysis (Complexity Theory)

Writing working code is not enough. We must build **efficient** code. Algorithm Analysis is the mathematical framework used to evaluate program performance before executing it.

---

## 1. Time & Space Complexity

### ❓ What are they?
- **Time Complexity**: How the execution time of an algorithm grows relative to the input size ($N$).
- **Space Complexity**: How the memory footprint of an algorithm grows relative to the input size ($N$).

### 💡 Why do we need them?
Running time varies on different hardware (a fast CPU runs bad code quickly, but crashes on large datasets). We need a hardware-independent metric to compare algorithms.

---

## 2. Big O Notation: The Worst-Case Limit

### ❓ What is Big O ($O$)?
Big O notation describes the **upper bound** (worst-case scenario) of an algorithm's growth rate. It ignores constant factors and low-order terms.

```
Time/Operations
   ▲
   │         /  O(N²)  [Quadratic: Nested loops]
   │        /
   │       /    O(N)   [Linear: Single loop]
   │      /
   │     /      O(log N) [Logarithmic: Binary Search]
   │   _ ───►  O(1)    [Constant: Direct index lookup]
   └──────────────────────────► Input Size (N)
```

### 🔍 Quick Growth Chart
| Notation | Name | Growth Behavior | Typical Example |
| :--- | :--- | :--- | :--- |
| $O(1)$ | Constant | Operations remain fixed regardless of $N$. | Array element access |
| $O(\log N)$ | Logarithmic | Input space is divided in half each step. | Binary Search |
| $O(N)$ | Linear | Operations scale 1:1 with input size. | Simple loop search |
| $O(N \log N)$ | Linear-Logarithmic | Divide-and-conquer sorting. | Merge Sort / Quick Sort |
| $O(N^2)$ | Quadratic | Nested loops. | Bubble Sort / Matrix Multiplication |

---

## 3. Estimating Complexities of Loops

### 🔹 Single Loop: $O(N)$
```c
for (int i = 0; i < n; i++) {
    // runs N times
}
```

### 🔹 Nested Loop: $O(N^2)$
```c
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // runs N * N times
    }
}
```

### 🔹 Halving Loop: $O(\log N)$
```c
for (int i = 1; i < n; i = i * 2) {
    // runs log2(N) times
}
```

🧠 **Real-World Use Case (Scalability)**:
Imagine you have an database of 1,000,000 customers.
- An $O(N)$ linear search takes **1,000,000 operations** in the worst case.
- An $O(\log N)$ binary search takes only **20 operations** ($\log_2(1,000,000) pprox 19.9$).
Understanding this difference prevents search queries from bottlenecking your application backend.
