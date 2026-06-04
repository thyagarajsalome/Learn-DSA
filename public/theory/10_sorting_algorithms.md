# Module 10: Sorting Algorithms

Sorting is the process of arranging elements in numerical or alphabetical order.

---

## 1. Quadratic Sorting ($O(N^2)$)

These algorithms are simple to write but perform poorly on large datasets.

1. **Bubble Sort**: Repeatedly swap adjacent elements if they are in the wrong order. The largest element "bubbles up" to the end of the array each pass.
2. **Selection Sort**: Find the minimum element in the unsorted section and swap it into the first slot.
3. **Insertion Sort**: Build a sorted sub-array. Take the next element and shift existing sorted elements right to insert it into its correct position.

---

## 2. Divide-and-Conquer Sorting ($O(N \log N)$)

These algorithms are more complex but scale significantly better.

### 🔹 Merge Sort: Split & Recomb
Recursively split the array in half until individual elements remain. Then merge the sorted sub-arrays back together.
- *Pros*: Stable sorting, guarantees $O(N \log N)$ runtime.
- *Cons*: Requires $O(N)$ extra helper memory workspace.

```
       [ 38 | 27 | 43 | 3 ]
        /            \
   [ 38 | 27 ]     [ 43 | 3 ]
    /      \       /      \
  [38]    [27]   [43]     [3]
    \      /       \      /
   [ 27 | 38 ]     [ 3 | 43 ]
        \            /
       [ 3 | 27 | 38 | 43 ] (Sorted! 🎉)
```

### 🔹 Quick Sort: Pivot Partitioning
Select a "Pivot" element. Partition the array so all elements smaller than pivot are moved to the left, and elements larger than pivot are moved to the right. Recursively sort the sub-partitions.
- *Pros*: Highly efficient in-place sorting ($O(1)$ extra space).
- *Cons*: Worst-case is $O(N^2)$ if pivot selection is poor (e.g. sorted input array).

---

## 3. Complexity Comparison Table

| Algorithm | Best Case | Avg Case | Worst Case | Space Complexity | Stable? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| **Insertion Sort**| $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Yes |
| **Merge Sort** | $O(N \log N)$ | $O(N \log N)$ | $O(N \log N)$| $O(N)$ | Yes |
| **Quick Sort** | $O(N \log N)$ | $O(N \log N)$ | $O(N^2)$ | $O(\log N)$ | No |
