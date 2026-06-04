# Module 9: Searching Algorithms

Searching is the process of locating a target value within a collection of data.

---

## 1. Linear Search vs. Binary Search

| Feature | Linear Search | Binary Search |
| :--- | :--- | :--- |
| **Prerequisite** | None (Works on unsorted arrays) | Array **must be sorted** |
| **Strategy** | Scan index 0 to N-1 sequentially | Divide-and-Conquer (Halve space) |
| **Time Complexity** | $O(N)$ (Slow) | $O(\log N)$ (Extremely Fast) |
| **Comparison Limit** | Up to $N$ steps | Up to $\log_2 N$ steps |

---

## 2. Binary Search: The Divide-and-Conquer Strategy

### 🔍 How does it work?
1. Find the midpoint of the sorted array: `mid = low + (high - low) / 2`.
2. Compare target with `A[mid]`.
   - If target == `A[mid]`, target found! Return index.
   - If target < `A[mid]`, search the left half (`high = mid - 1`).
   - If target > `A[mid]`, search the right half (`low = mid + 1`).
3. Repeat until `low > high` (target not found).

```
Target = 70
Sorted Array: [ 10 | 20 | 30 | 40 | 50 | 60 | 70 ]
                 ▲              ▲              ▲
                Low            Mid            High
Compare Target 70 with Mid 40. 70 > 40, so narrow search space to right half:
                               [ 50 | 60 | 70 ]
                                 ▲    ▲    ▲
                                Low  Mid  High
Compare Target 70 with Mid 60. 70 > 60, right half:
                                     [ 70 ]
                                      Low/Mid/High (Found! 🎉)
```

### 💻 Implementation
```c
int binarySearch(int arr[], int low, int high, int target) {
    while (low <= high) {
        int mid = low + (high - low) / 2;
        
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1; // Not found
}
```

🧠 **Logarithmic Scaling Analogy**:
If you search a physical **Phone Book** of 1,000 pages for a name starting with "T", you don't scan page 1, then page 2. You open the book to the middle, check the letter, determine which half contains the name, discard the other half, and repeat. You will find the name in under 10 flips!
