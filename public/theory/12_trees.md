# Module 12: Trees & BST

A Tree is a non-linear, hierarchical data structure consisting of nodes connected by directed edges.

---

## 1. Key Terminology

- **Root**: The top node of the tree (no parent).
- **Leaf**: A node with no children.
- **Height**: The length of the longest path from a node to a leaf.

```
                 [Root: A]
                 /       \
             [Node: B]   [Node: C]
              /
          [Leaf: D]
```

---

## 2. Binary Search Tree (BST)

### ❓ What is a BST?
A Binary Tree where each node follows a strict ordering property:
- All values in the **Left Subtree** are smaller than the node's value.
- All values in the **Right Subtree** are larger than the node's value.

```
                  [ 50 ]
                 /      \
             [ 30 ]    [ 70 ]
             /    \
          [ 20 ]  [ 40 ]
```

### 🔍 Binary Tree Traversals
1. **Inorder (Left ──► Root ──► Right)**: Returns elements in **sorted ascending order**.
2. **Preorder (Root ──► Left ──► Right)**: Used to copy trees or construct prefix expressions.
3. **Postorder (Left ──► Right ──► Root)**: Used for node deletion (bottom-up deletion).

---

## 3. Balanced Trees: The AVL Tree

### ❓ Why balance a tree?
If you insert sorted numbers `10, 20, 30, 40` into a standard BST, it forms a straight line pointing right. This is called a **skewed tree**. Search time degrades to a slow $O(N)$ linear scan.

An **AVL Tree** self-balances by keeping track of the **Balance Factor (BF)** of each node:
$$BF = \text{Height of Left Subtree} - \text{Height of Right Subtree}$$
If $BF$ ever deviates from $\{-1, 0, 1\}$, the AVL tree triggers **Rotations** (Single LL/RR, or Double LR/RL) to re-align nodes and restore $O(\log N)$ search time.

🌐 **Real Use Case (Database Indexes)**:
Databases (like SQLite, PostgreSQL, and MySQL) store data index files using self-balancing tree variants (B-Trees / B+ Trees) to fetch data records from disks in a fraction of a millisecond.
