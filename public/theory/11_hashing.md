# Module 11: Hashing & Buckets

Hashing is a technique used to map arbitrary-sized keys to fixed-sized integer index slots inside an array (Hash Table) for $O(1)$ access.

---

## 1. Hash Functions & Modulo Arithmetic

### ❓ What is a Hash Function?
A function $h(key)$ that takes an input key and computes an index offset where the data records reside.

### 🔍 Modulo Hash Function
For numerical keys, we map keys to a table of size $S$:
$$h(key) = key \bmod S$$

For example, if Table Size $S = 10$:
- $h(27) = 27 \bmod 10 = 7$ (Store at index 7)
- $h(15) = 15 \bmod 10 = 5$ (Store at index 5)

---

## 2. Collision Handling

### ❓ What is a Collision?
When two different keys compute to the exact same hash index. For example, if $S = 10$, $h(27)$ and $h(37)$ both return index `7`.

Since a memory cell can only hold one record, we must resolve this collision.

```
Linear Probing:   [Slot 7: Key 27] ──► [Slot 8: Key 37 (Probed)]
Separate Chaining: [Slot 7] ──► [Key 27 | Next] ──► [Key 37 | NULL]
```

### 🔹 1. Separate Chaining (Open Hashing)
Each array slot points to a Linked List bucket. When a collision occurs, we append the new record to the list at that index.
- *Pros*: Table never gets full. Simple deletion.
- *Cons*: Wastes memory on node link pointers. If many collisions occur, bucket list lookup slows to $O(N)$ linear scans.

### 🔹 2. Open Addressing: Linear Probing
If a collision occurs at index $i$, scan step-by-step for the next open cell: $(i + 1) \bmod S, (i + 2) \bmod S$, etc.
- *Pros*: High cache locality, saves pointer space.
- *Cons*: Causes **clustering** (contiguous blocks of filled cells that slow down future searches).

🧠 **Real-World Analogy**:
- **Separate Chaining**: If an apartment mailbox (bucket index) has mail for two different residents, the postman places both letters in the same box (chaining).
- **Linear Probing**: If you park your car at spot 7, but it's occupied, you park at spot 8, or the next available adjacent spot.
