# Module 3: Arrays & Memory Models

An array is the simplest and most widely used contiguous data structure.

---

## 1. Contiguous Memory Representation

### ❓ What is Contiguous Allocation?
Elements in an array are stored in adjacent, unbroken blocks of physical RAM memory.

### 💡 Why does it matter?
Because elements are adjacent, the CPU can calculate the exact memory location of any item in constant time $O(1)$ using math, without traversing other elements.

### 🔍 Memory Address Formula (1D Array)
$$\text{Address of } A[i] = \text{Base Address} + (i \times \text{Size of Data Type})$$

For example, if an integer array starts at Base Address `1000`, and each integer occupies `4 bytes`, the address of `A[3]` is:
$$1000 + (3 \times 4) = 1012$$

---

## 2. Multi-Dimensional Arrays (2D Arrays)

Computers store memory in a 1D flat line. To store a 2D grid, C must flatten it using one of two methods:

```
Row-Major:    [Row 0] ──► [Row 1] ──► [Row 2]
Column-Major: [Col 0] ──► [Col 1] ──► [Col 2]
```

1. **Row-Major Order (Used by C)**: Elements are stored row-by-row.
   $$\text{Address of } A[i][j] = \text{Base} + (i \times \text{Columns} + j) \times \text{Size}$$
2. **Column-Major Order**: Elements are stored column-by-column.
   $$\text{Address of } A[i][j] = \text{Base} + (j \times \text{Rows} + i) \times \text{Size}$$

---

## 3. Sparse Matrix Compression

### ❓ What is a Sparse Matrix?
A matrix that contains a very high percentage of **zero elements** (or empty slots).

### 💡 Why compress it?
Storing a $1000 	imes 1000$ matrix requires 1,000,000 integer blocks. If only 100 entries are non-zero, $99.99\%$ of the memory is wasted storing zeros.

### 🔍 The 3-Tuple Compression Layout
We save memory by storing only the non-zero elements in a table containing 3 columns:
1. **Row Index**
2. **Column Index**
3. **Value**

```
Standard Matrix:
[ 0  5  0 ]
[ 0  0  8 ]
[ 3  0  0 ]

Compressed 3-Tuple:
Row   Col   Val
 0     1     5
 1     2     8
 2     0     3
```

📦 **Real Use Case**: Large network graphs (like Google Maps or Facebook connections) are sparse matrices. Most people are connected to only a tiny fraction of the global population. Using compressed sparse representations saves gigabytes of server RAM.
